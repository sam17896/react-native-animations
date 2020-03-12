import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { eq, sub } from "react-native-reanimated";
import { withTransition } from "react-native-redash";
import { Colors, ICON_SIZE, PADDING } from "./icons/Constants";

const size = ICON_SIZE + PADDING * 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  },
  weave: {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderColor: Colors.primary,
    borderWidth: 4
  }
});

export default ({ active, index }) => {
  const isActive = eq(active, index);
  const activeTransition = withTransition(isActive);
  const opacity = sub(1, activeTransition);
  const scale = activeTransition;
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.weave, { opacity, transform: [{ scale }] }]}
      />
    </View>
  );
};
