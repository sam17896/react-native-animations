import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { MIN_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import Animated from 'react-native-reanimated';

const {
  interpolate,
  Extrapolate
} = Animated;

export default ({ artist, y }) => {
  const opacity = interpolate(y, {
    inputRange: [HEADER_DELTA - 16, HEADER_DELTA],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  })
  const textOpacity = interpolate(y, {
    inputRange: [HEADER_DELTA - 8, HEADER_DELTA - 4],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  })
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.Text style={[styles.title, { opacity }]}>{artist}</Animated.Text>
    </Animated.View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: "black",
    paddingTop: 64,
  },
  title: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
});
