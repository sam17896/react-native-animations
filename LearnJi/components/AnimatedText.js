import * as React from "react";
import { TextInput, TextStyle } from "react-native";
import Animated from 'react-native-reanimated';

const { Value } = Animated;
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);


export default (props) => {
  const { text, style } = { style: {}, ...props };
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
     // value={text}
      {...{ text, style }}
    />
  );
};
