import React from "react";
import { View , Dimensions} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Animated from 'react-native-reanimated';
import { initialSideWidth } from "./WeaveHelpers";
const size = 50;
const { width } = Dimensions.get('window');
const {
  sub,
  interpolate
} = Animated
export default ({progress, y}) => {
  const translateY = sub(y, size/2);
  const translateX = interpolate(progress, {
    inputRange: [0, 0.4],
    outputRange: [ width - initialSideWidth - size + 8, 0]
  });
  const opacity = interpolate(progress, {
    inputRange: [0, 0.1],
    outputRange: [1, 0]
  });
  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: [
          {translateY},
          {translateX}
        ]
      }}
    >
      <Icon name="chevron-left" color="black" size={40} />
    </Animated.View>
  );
};
