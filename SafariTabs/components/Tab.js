import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  View
} from "react-native";
import Animated from 'react-native-reanimated';
import Content from "./Content";
import { OVERVIEW } from "./Model";
import { bInterpolate, translateZ } from "react-native-redash";

const perspective = 1000;
const { height } = Dimensions.get("window");

const {
  multiply,
  sin,
  divide,
  sub,
  abs
} = Animated;
export default ({
  tab,
  selectedTab,
  index,
  transition,
  selectTab: onPress,
  closeTab
}) => {
 // console.log();
 const H = -height / 2;
 const position = index > selectedTab ? height : 0;
 const top = selectedTab === OVERVIEW ? index * 150 : position;
 const rotateX = bInterpolate(transition, 0, -Math.PI / 6);
 const z = multiply(H, sin(abs(rotateX)));
 const transform =
   Platform.OS === "android"
     ? [
         { rotateX: selectedTab === OVERVIEW ? -Math.PI / 6 : 0 },
         { scale: selectedTab === OVERVIEW ? 0.8 : 1 }
       ]
     : [{ perspective }, { rotateX }, translateZ(perspective, z)];
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          height,
          top,
          transform
        }}
      >
        <Content {...{ closeTab, tab, selectedTab }} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
