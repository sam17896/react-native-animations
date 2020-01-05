import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, bin, useTransition, withTransition, onGestureEvent } from "react-native-redash";
import Chevron from "./Chevron";
import Item, { LIST_ITEM_HEIGHT } from "./ListItem";
import { PanGestureHandler, State } from "react-native-gesture-handler";
const {
  Value,
  cond,
  useCode,
  eq,
  not,
  set,
  interpolate
} = Animated;
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  items: {
    overflow: "hidden"
  }
});


export default ({ list }) => {
  const open = new Value(0);
  const transition = withTransition(open);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({state});
  const height = bInterpolate(
    transition,
    0,
    LIST_ITEM_HEIGHT * list.items.length
  );
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0]
  });

  useCode(() =>  cond(eq(state, State.END), set(open, not(open))), [open, state])
  return (
    <>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius
            }
          ]}
        >
          <Text style={styles.title}>Total Points</Text>
          <Chevron {...{ transition }} />
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.items, { height }]}>
        {list.items.map((item, key) => (
          <Item {...{ item, key }} isLast={key === list.items.length - 1} />
        ))}
      </Animated.View>
    </>
  );
};