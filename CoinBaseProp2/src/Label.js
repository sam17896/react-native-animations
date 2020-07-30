import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {formatUSD, scaleYInvert} from './Helpers';
import ReText from './ReText';
const styles = StyleSheet.create({
  container: {
    width: 100,
    alignSelf: 'flex-end',
    backgroundColor: '#FEFFFF',
    borderRadius: 4,
    padding: 4,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const Label = ({translateY, opacity}) => {
  const text = useDerivedValue(() => {
    const price = scaleYInvert(translateY.value);
    console.log(price);
    return formatUSD(price);
  });

  const horizontal = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));
  return (
    <Animated.View style={[styles.container, horizontal]}>
      <ReText {...{text}} />
    </Animated.View>
  );
};

export default Label;
