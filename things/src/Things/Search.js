import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { StyleGuide } from "../components";
import Animated from 'react-native-reanimated';
const {
  sub, interpolate,
  Extrapolate
} = Animated
import { clamp, interpolateColor } from 'react-native-redash';
const grey = {
  r: 186,
  g: 187,
  b: 199
};
const primary = {
  r: 56,
  g: 132,
  b: 255
};
const size = 48;
const marginTop = 32;
const CONTAINER_HEIGHT = 100;
export const THRESHOLD = CONTAINER_HEIGHT + marginTop;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -CONTAINER_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  search: {
    width: size,
    height: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center"
  }
});


export default memo(({ translateY }) => {
  const searchTranslateY = clamp(translateY, 0, THRESHOLD);
  const backgroundColor = interpolateColor(translateY, {
    inputRange: [CONTAINER_HEIGHT, THRESHOLD],
    outputRange: [grey, primary]
  })
  const opacity = interpolate(translateY, {
    inputRange: [CONTAINER_HEIGHT, THRESHOLD],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  })
  const oppositeOpacity = sub(1, opacity);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.search, {
        transform: [
          { translateY: searchTranslateY }
        ],
        backgroundColor
      }]}>
          <Icon name="search" size={32} color="white" />
      </Animated.View>
      <Animated.View style={{
        transform: [
          { translateY }
        ]
      }}>
        <Animated.View style={{ opacity }}>
          <Icon name="chevron-down" size={32} color="#babbc7" />
        </Animated.View>
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity: oppositeOpacity }}>
          <Icon
            name="chevron-down"
            size={32}
            color={StyleGuide.palette.primary}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
});
