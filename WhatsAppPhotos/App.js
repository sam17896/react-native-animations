import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  add,
  and,
  clockRunning,
  cond,
  debug,
  divide,
  eq,
  floor,
  multiply,
  neq,
  not,
  onChange,
  set,
  sub,
  useCode,
} from 'react-native-reanimated';
import {
  clamp,
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
} from 'react-native-redash';
import ImageViewer from './src/ImageViewer';

const {width, height} = Dimensions.get('window');

export const assets = [
  require('./src/assets/3.jpg'),
  require('./src/assets/2.jpg'),
  require('./src/assets/4.jpg'),
  require('./src/assets/5.jpg'),
  require('./src/assets/1.jpg'),
];

const snapPoints = assets.map((_, i) => i * -width);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  pictures: {
    width: width * assets.length,
    height,
    flexDirection: 'row',
  },
  picture: {
    width,
    height,
    overflow: 'hidden',
  },
});

const Swiper = () => {
  const clock = useClock();
  const index = useValue(0);
  const offsetX = useValue(0);
  const translationX = useValue(0);
  const translateX = useValue(0);
  const {gestureHandler, state, velocity, translation} = usePanGestureHandler();
  const to = clamp(
    snapPoint(translateX, velocity.x, snapPoints),
    multiply(-width, add(index, 1)),
    multiply(-width, sub(index, 1)),
  );
  useCode(
    () => [
      onChange(
        translationX,
        cond(eq(state, State.ACTIVE), [
          set(translateX, add(offsetX, translationX)),
        ]),
      ),
      cond(and(eq(state, State.END), neq(translationX, 0)), [
        set(translateX, timing({clock, from: translateX, to})),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          set(index, floor(divide(translateX, -width))),
        ]),
      ]),
    ],
    [],
  );
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.pictures, {transform: [{translateX}]}]}>
            {assets.map((source, i) => (
              <View key={source} style={styles.picture}>
                <ImageViewer
                  isActive={eq(index, i)}
                  panState={state}
                  panTranslation={translation}
                  panVelocity={velocity}
                  swipeX={translationX}
                  {...{source}}
                />
              </View>
            ))}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Swiper;
