import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import Animated, {
  abs,
  add,
  call,
  clockRunning,
  cond,
  eq,
  not,
  set,
  useCode,
  max,
  min,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  clamp,
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
  minus,
} from 'react-native-redash';
import ItemLayout, {ItemModel, HEIGHT} from './ItemLayout';
import Action from './Action';

const {width} = Dimensions.get('window');
const snapPoints = [-width, -100, 0];
const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E1E2E3',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

const Item = ({item, onSwipe}) => {
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
  const translateX = useValue(0);
  const offsetX = useValue(0);
  const height = useValue(HEIGHT);
  const deleteOpacity = useValue(1);
  const clock = useClock();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  const shouldRemove = useValue(0);
  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(
          translateX,
          add(offsetX, clamp(translation.x, -9999, minus(offsetX))),
        ),
      ),
      cond(eq(state, State.END), [
        set(translateX, timing({clock, from: translateX, to})),
        set(offsetX, translateX),
        cond(eq(to, -width), set(shouldRemove, 1)),
      ]),
      cond(shouldRemove, [
        set(height, timing({from: HEIGHT, to: 0})),
        set(deleteOpacity, 0),
        cond(not(clockRunning(clock)), call([], onSwipe)),
      ]),
    ],
    [onSwipe],
  );
  return (
    <Animated.View>
      <View style={styles.background}>
        <TouchableWithoutFeedback onPress={() => shouldRemove.setValue(1)}>
          <Action x={abs(translateX)} {...{deleteOpacity}} />
        </TouchableWithoutFeedback>
      </View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{height, transform: [{translateX}]}}>
          <ItemLayout {...{item}} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Item;
