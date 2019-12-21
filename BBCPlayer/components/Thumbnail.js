import * as React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width,
    aspectRatio: 640 / 360
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined
  }
});


export default ({ channel: { cover } }) => {
  return (
    <>
      <View style={styles.container}>
        <Image source={cover} style={styles.cover} />
      </View>
    </>
  );
};
