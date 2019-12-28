import * as React from "react";
import { StyleSheet, View } from "react-native";

import Tab from "./Tab";
import { TabModel } from "./Content";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row"
  }
});


export default ({ tabs, active, onMeasurement, onPress }) => (
  <View style={styles.overlay}>
    {tabs.map((tab, index) => (
      <Tab
        key={index}
        onMeasurement={
          onMeasurement ? onMeasurement.bind(null, index) : undefined
        }
        color={active ? "white" : "black"}
        onPress={onPress ? onPress.bind(null, index) : undefined}
        {...tab}
      />
    ))}
  </View>
);
