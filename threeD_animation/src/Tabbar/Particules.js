import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  add,
  and,
  divide,
  interpolate,
  multiply,
  neq
} from "react-native-reanimated";
import { withSpring, withSpringTransition } from "react-native-redash";
import { Colors, ICON_SIZE, PADDING, SEGMENT } from "./icons/Constants";


const size = 6;
const topParticules = [0, 1, 2];
const bottomParticules = [0, 1];
const HEIGHT = ICON_SIZE + PADDING;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center"
  },
  particules: {
    height: HEIGHT
  },
  particule: {
    position: "absolute",
    top: 0,
    left: 0,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: Colors.primary
  }
});

export default ({ transition, activeTransition }) => {
  const middle = HEIGHT / 2 - size / 2;
  const opacity = and(neq(activeTransition, 0), neq(activeTransition, 1));
  const x = add(multiply(transition, SEGMENT), SEGMENT / 2 - size / 2);
  const top = interpolate(activeTransition, {
    inputRange: [0, 0.5, 1],
    outputRange: [middle, 0, middle]
  });
  const bottom = interpolate(activeTransition, {
    inputRange: [0, 0.5, 1],
    outputRange: [middle, HEIGHT, middle]
  });
  const s = interpolate(activeTransition, {
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1, 0.8]
  });
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.particules}>
        {topParticules.map(particule => {
          const subParticules = topParticules.slice(0, particule);
          const translateX = subParticules.reduce(
            acc => withSpringTransition(acc),
            x
          );
          const translateY = subParticules.reduce(
            acc => withSpringTransition(acc),
            top
          );
          const scale = subParticules.reduce(
            acc => withSpringTransition(acc),
            s
          );
          return (
            <Animated.View
              key={particule}
              style={[
                styles.particule,
                {
                  opacity,
                  transform: [{ translateX, translateY, scale }]
                }
              ]}
            />
          );
        })}
        {bottomParticules.map(particule => {
          const subParticules = bottomParticules.slice(0, particule);
          const translateX = subParticules.reduce(
            acc => withSpringTransition(acc),
            divide(add(x, withSpringTransition(x)), 2)
          );
          const translateY = subParticules.reduce(
            acc => withSpringTransition(acc),
            divide(add(bottom, withSpringTransition(bottom)), 2)
          );
          const scale = subParticules.reduce(
            acc => withSpringTransition(acc),
            divide(add(s, withSpringTransition(s)), 2)
          );
          return (
            <Animated.View
              key={particule}
              style={[
                styles.particule,
                {
                  opacity,
                  transform: [{ translateX, translateY, scale }]
                }
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};
