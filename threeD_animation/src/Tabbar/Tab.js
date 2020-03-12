import React, { ReactElement, cloneElement } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { ICON_SIZE } from "./icons/Constants";

const styles = StyleSheet.create({});

export default ({ children, active, index, onPress }) => {
  const isActive = active === index;
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <View
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE
        }}
      >
        {cloneElement(children, { active: isActive })}
      </View>
    </TouchableWithoutFeedback>
  );
};
