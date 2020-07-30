import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  Clock,
  and,
  block,
  cond,
  diff,
  eq,
  multiply,
  neq,
  not,
  or,
  set,
  stopClock,
  sub,
  useCode,
} from 'react-native-reanimated';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {
  Vector,
  pinchActive,
  pinchBegan,
  translate,
  usePinchGestureHandler,
  useValue,
  useVector,
  vec,
} from 'react-native-redash';
import {decayVector} from './AnimationUtil';

const {width, height} = Dimensions.get('window');
const CANVAS = vec.create(width, height);
const CENTER = vec.divide(CANVAS, 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
});

export default ({
  panState,
  panTranslation,
  panVelocity,
  isActive,
  swipeX,
  source,
}) => {
  const shouldDecay = useValue(0);
  const clock = vec.create(new Clock(), new Clock());
  const origin = useVector(0, 0);
  const scale = useValue(1);
  const scaleOffset = useValue(1);
  const translation = vec.createValue(0, 0);
  const offset = useVector(0, 0);
  const {
    gestureHandler,
    numberOfPointers,
    state,
    scale: gestureScale,
    focal,
  } = usePinchGestureHandler();
  const adjustedFocal = vec.sub(focal, vec.add(CENTER, offset));
  const minVec = vec.multiply(-0.5, CANVAS, sub(scale, 1));
  const maxVec = vec.minus(minVec);
  const clamped = vec.sub(
    vec.clamp(vec.add(offset, panTranslation), minVec, maxVec),
    offset,
  );
  useCode(
    () =>
      block([
        cond(and(isActive, eq(panState, State.ACTIVE)), [
          vec.set(translation, clamped),
          set(swipeX, sub(panTranslation.x, clamped.x)),
        ]),
        cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
        cond(pinchActive(state, numberOfPointers), [
          vec.set(
            translation,
            vec.add(
              vec.sub(adjustedFocal, origin),
              origin,
              vec.multiply(-1, gestureScale, origin),
            ),
          ),
        ]),
        cond(
          and(
            isActive,
            or(eq(panState, State.END), eq(panState, State.UNDETERMINED)),
            or(eq(state, State.END), eq(state, State.UNDETERMINED)),
          ),
          [
            vec.set(offset, vec.add(offset, translation)),
            set(scaleOffset, scale),
            set(gestureScale, 1),
            vec.set(translation, 0),
            vec.set(focal, 0),
          ],
        ),
        cond(
          and(
            isActive,
            neq(diff(panState), 0),
            eq(panState, State.END),
            neq(state, State.ACTIVE),
          ),
          [set(shouldDecay, 1)],
        ),
        cond(shouldDecay, [
          vec.set(
            offset,
            vec.clamp(decayVector(offset, panVelocity, clock), minVec, maxVec),
          ),
        ]),
        cond(
          and(
            isActive,
            or(eq(panState, State.ACTIVE), eq(state, State.ACTIVE)),
          ),
          [stopClock(clock.x), stopClock(clock.y), set(shouldDecay, 0)],
        ),
        cond(not(isActive), [
          stopClock(clock.x),
          stopClock(clock.y),
          set(shouldDecay, 0),
          vec.set(offset, 0),
          set(scaleOffset, 1),
          set(gestureScale, 1),
          vec.set(translation, 0),
          vec.set(focal, 0),
        ]),
        set(scale, multiply(gestureScale, scaleOffset)),
      ]),
    [],
  );
  return (
    <View style={styles.container}>
      <PinchGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.Image
            style={[
              styles.image,
              {
                transform: [
                  ...translate(vec.add(offset, translation)),
                  {scale},
                ],
              },
            ]}
            {...{source}}
          />
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};
