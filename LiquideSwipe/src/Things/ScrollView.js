import React, { ReactNode, memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";
import { snapPoint, verticalPanGestureHandler } from "react-native-redash";
import { THRESHOLD } from "./Search";

const {
  SpringUtils,
  Value,
  Clock,
  eq,
  startClock,
  set,
  add,
  and,
  greaterOrEq,
  lessOrEq,
  cond,
  decay,
  block,
  not,
  spring,
  abs,
  multiply,
  divide,
  sub,
  useCode,
  call,
  neq,
  diff,
  pow,
  min
} = Animated;

const friction = (ratio) =>
  multiply(0.52, pow(sub(1, ratio), 2));

const withScroll = ({
  translationY,
  velocityY,
  state: gestureState,
  containerHeight,
  contentHeight
}) => {
  const clock = new Clock();
  const delta = new Value(0);
  const isSpringing = new Value(0);
  const state = {
    time: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
    finished: new Value(0)
  };
  const upperBound = 0;
  const lowerBound = -1 * (contentHeight - containerHeight);
  const isInBound = and(
    lessOrEq(state.position, upperBound),
    greaterOrEq(state.position, lowerBound)
  );
  const config = {
    ...SpringUtils.makeDefaultConfig(),
    toValue: new Value(0)
  };
  const overscroll = sub(
    state.position,
    cond(greaterOrEq(state.position, 0), upperBound, lowerBound)
  );
  return block([
    startClock(clock),
    set(delta, diff(translationY)),
    cond(
      eq(gestureState, State.ACTIVE),
      [
        set(isSpringing, 0),
        set(
          state.position,
          add(
            state.position,
            cond(
              isInBound,
              delta,
              multiply(
                delta,
                friction(min(divide(abs(overscroll), containerHeight), 1))
              )
            )
          )
        ),
        set(state.velocity, velocityY),
        set(state.time, 0)
      ],
      [
        set(translationY, 0),
        cond(
          and(isInBound, not(isSpringing)),
          [decay(clock, state, { deceleration: 0.997 })],
          [
            set(isSpringing, 1),
            set(
              config.toValue,
              snapPoint(state.position, state.velocity, [
                lowerBound,
                upperBound
              ])
            ),
            spring(clock, state, config)
          ]
        )
      ]
    ),
    state.position
  ]);
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default memo(({ children, translateY, onPull }) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const { gestureHandler, translationY, velocityY, state } = useMemoOne(
    () => verticalPanGestureHandler(),
    []
  );
  useCode(
    block([
      set(
        translateY,
        withScroll({
          translationY,
          velocityY,
          state,
          containerHeight,
          contentHeight
        })
      ),
      cond(
        and(greaterOrEq(translateY, THRESHOLD), neq(state, State.ACTIVE)),
        call([], onPull)
      )
    ]),
    [containerHeight, contentHeight, onPull]
  );
  return (
    <View
      style={styles.container}
      onLayout={({
        nativeEvent: {
          layout: { height }
        }
      }) => setContainerHeight(height)}
    >
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          onLayout={({
            nativeEvent: {
              layout: { height }
            }
          }) => setContentHeight(height)}
          style={{ transform: [{ translateY }] }}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
});
