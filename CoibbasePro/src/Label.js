import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {interpolate} from 'react-native-reanimated';
import {format} from './Helpers';
import {ReText} from 'react-native-redash';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    alignSelf: 'flex-end',
    padding: 4,
    marginTop: 4,
  },
  label: {
    color: 'black',
  },
});
const Label = ({domain, y, size, opacity}) => {
  const value = interpolate(y, {
    inputRange: [0, size],
    outputRange: [domain[1], domain[0]],
  });
  const formattedValue = format(value);
  return (
    <Animated.View
      style={[styles.container, {opacity, transform: [{translateY: y}]}]}>
      <ReText style={styles.label} text={formattedValue} />
    </Animated.View>
  );
};

export default Label;
