import * as React from "react";
import { View, StyleSheet } from "react-native";
import Animated from 'react-native-reanimated';
import CircularSelection from "./CircularSelection";
import Thumbnails from "./Thumbnails";

const {
  Value
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#1a1b1c"
  }
});


export default ({ channels }) => {
  const index = new Value(0);
  return (
    <View style={styles.container}>
      <Thumbnails {...{ channels, index}} />
      <CircularSelection {...{ channels, index }} />
    </View>
  );
};
