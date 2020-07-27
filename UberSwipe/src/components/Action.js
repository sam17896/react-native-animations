import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  divide,
  interpolate,
  Extrapolate,
  sub,
  cond,
  add,
  lessThan,
  multiply,
} from 'react-native-reanimated';
import {HEIGHT} from './ItemLayout';

const styles = StyleSheet.create({
  remove: {
    color: 'white',
    //fontFamily: 'UberMoveMedium',
    fontSize: 14,
  },
});

const Action = ({x, deleteOpacity}) => {
  const size = cond(lessThan(x, HEIGHT), x, add(x, sub(x, HEIGHT)));
  const translateX = cond(lessThan(x, HEIGHT), 0, divide(sub(x, HEIGHT), 2));
  const borderRadius = divide(size, 2);
  const iconOpacity = interpolate(size, {
    inputRange: [HEIGHT - 10, HEIGHT + 10],
    outputRange: [1, 0],
  });
  const scale = interpolate(size, {
    inputRange: [20, 30],
    outputRange: [0.001, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const textOpacity = sub(1, iconOpacity);

  return (
    <Animated.View
      style={{
        backgroundColor: '#D93F12',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius,
        transform: [{translateX}],
        height: size,
        width: size,
      }}>
      <Animated.View
        style={{
          height: 5,
          width: 20,
          opacity: iconOpacity,
          backgroundColor: 'white',
          transform: [{scale}],
        }}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          opacity: multiply(textOpacity, deleteOpacity),
          alignItems: 'center',
        }}>
        <Text style={styles.remove}>Remove</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Action;
