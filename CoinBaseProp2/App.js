import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Chart from './src/Chart';
import Values from './src/Values';
import Line from './src/Line';
import Label from './src/Label';
import Content from './src/Content';
import Header from './src/Header';
import {SIZE, STEP} from './src/Helpers';
export const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

const Coinbase = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({x, y}) => {
      opacity.value = 1;
      translateY.value = clamp(y, 0, SIZE);
      translateX.value = x - (x % STEP) + STEP / 2;
    },
    onEnd: () => {
      opacity.value = 0;
    },
  });

  const horizontal = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));
  const vertical = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateX: translateX.value}],
  }));
  return (
    <View style={styles.container}>
      <View>
        <Header />
        <View pointerEvents="none">
          <Values {...{translateX}} />
        </View>
      </View>
      <View>
        <Chart />
        <PanGestureHandler minDist={0} {...{onGestureEvent}}>
          <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.View style={[StyleSheet.absoluteFill, horizontal]}>
              <Line x={SIZE} y={0} />
            </Animated.View>
            <Animated.View style={[StyleSheet.absoluteFill, vertical]}>
              <Line x={0} y={SIZE} />
            </Animated.View>
            <Label {...{translateY, opacity}} />
          </Animated.View>
        </PanGestureHandler>
      </View>
      <Content />
    </View>
  );
};

export default Coinbase;
