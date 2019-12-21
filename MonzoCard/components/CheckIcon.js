import * as React from "react";
import { View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Feather';


const CHECK_ICON_SIZE = 35;

export default ({ color: backgroundColor }) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Icon name="check" color="white" size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CHECK_ICON_SIZE,
    height: CHECK_ICON_SIZE,
    borderRadius: CHECK_ICON_SIZE / 2,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  }
});
