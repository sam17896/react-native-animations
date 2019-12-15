import * as React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import {  MAX_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const {
  interpolate, Extrapolate
} = Animated;

export default ({ album: { cover }, y }) => {
  const scale = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT, 0],
    outputRange: [4, 1],
    extrapolateRight: Extrapolate.CLAMP
  });
  const opacity = interpolate(y, {
    inputRange: [-64, 0, HEADER_DELTA],
    outputRange: [0, 0.2, 1],
    extrapolateRight: Extrapolate.CLAMP
  });
  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Image style={styles.image} source={cover} />
      <Animated.View
        style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "black", opacity }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
