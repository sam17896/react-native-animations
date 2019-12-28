import React, { RefObject } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { useSafeArea } from "react-native-safe-area-context";

import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import TabHeader from "./TabHeader";
import { TabModel } from "./Content";

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  header: {
    flexDirection: "row",
    height: MIN_HEADER_HEIGHT,
    alignItems: "center",
    paddingHorizontal: PADDING
  },
  title: {
    fontFamily: "UberMoveText-Medium",
    fontSize: 18,
    marginLeft: PADDING,
    flex: 1
  }
});


import Animated from 'react-native-reanimated';
import { useValues, withTransition } from "react-native-redash";

const {
  Value,
  Extrapolate,
  interpolate,
  useCode,
  set,
  greaterThan
} = Animated;

export default ({ tabs, y, scrollView }) => {
  const insets = useSafeArea();
  const [ toggle ] = useValues([0], []);
  const { top: paddingTop } = insets;
  const translateY = interpolate(y, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT, 0],
    extrapolateRight: Extrapolate.CLAMP
  });
  const translateX = interpolate(y, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [-(ICON_SIZE + PADDING), 0],
    extrapolate: Extrapolate.CLAMP
  });
  const transition = withTransition(toggle);
  const opacity = transition;
  useCode(() => set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT)), [])
  return (
    <View style={[styles.container, { paddingTop }]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "white",
          opacity
        }}
      />
      <View style={styles.header}>
        <View>
          <Icon name="arrow-left" size={ICON_SIZE} color="white" />
          <Animated.View style={{
            ...StyleSheet.absoluteFillObject,
            opacity
          }}>
            <Icon name="arrow-left" size={ICON_SIZE} color="black" />
          </Animated.View>
        </View>
        <Animated.Text style={[styles.title, { transform: [ { translateY }, { translateX } ] }]}>Miss Miu Europaallee</Animated.Text>
        <Icon name="heart" size={ICON_SIZE} color="white" />
      </View>
      <TabHeader {...{ tabs, transition, y, scrollView }} />
    </View>
  );
};
