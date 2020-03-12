import React from "react";
import { Text } from "react-native";

import StyleGuide from "./StyleGuide";

export default ({ dark, type, style, children }) => {
  const color = dark ? "white" : "black";
  return (
    <Text style={[StyleGuide.typography[type || "body"], { color }, style]}>
      {children}
    </Text>
  );
};
