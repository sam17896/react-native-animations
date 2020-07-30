import * as React from 'react';
import {TextStyle, TextProps as RNTextProps} from 'react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {TextInput} from 'react-native-gesture-handler';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const ReText = (props) => {
  const {text, style} = {style: {}, ...props};
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    };
  });
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      {...{style, animatedProps}}
    />
  );
};

export default ReText;
