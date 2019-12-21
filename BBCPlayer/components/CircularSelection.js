import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import LinearGradient  from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import ChannelIcon from "./ChannelIcon";
import PanGesture from "./PanGesture";

const { width } = Dimensions.get("window");
const height = width / 1.4;
const D = width * 1.2;
const innerR = D / 2;
const styles = StyleSheet.create({
  container: {
    width,
    height
  }
});

const {
  Value,
  interpolate
} = Animated;

export default ({ channels, index }) => {
  const { length } = channels;
  const a = Math.sin(Math.PI / length);
  const r = innerR * a  / ( 1 - a );
  const R = innerR + 2 * r;
  const cx = width / 2 - r;
  const cy = R - r;
  const rotateZ = interpolate(index, {
    inputRange: [0, length],
    outputRange: [0, 2 * Math.PI]
  })
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{
          ...StyleSheet.absoluteFillObject,
          borderRadius: R,
          width: R * 2,
          height: R * 2,
          left: -(R - width / 2)
        }}
        colors={["#353637", "#161819", "#161819"]}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            { translateY: R - height / 2 },
            { rotateZ },
            { translateY: -R + height / 2 }
          ]
        }}
      >
        {channels.map((_, key) => {
          return (
            <View
              {...{ key }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: [
                  { translateX: cx },
                  { translateY: cy },
                  { rotateZ: `${key * ( 2 * Math.PI / length)}rad` },
                  { translateY: -cy },
                ]
              }}
            >
              <ChannelIcon name={`${key + 1}`} radius={r} currentIndex={key} />
            </View>
          );
        })}
      </Animated.View>
      <PanGesture ratio={width / (length / 2 )} {...{index, length}}/>
    </View>
  );
};
