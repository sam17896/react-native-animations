import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import data from './src/data.json';
import Values from './src/Values';
import Line from './src/Line';
import Content from './src/Content';
import Header from './src/Header';
import Chart from './src/Chart';
import Label from './src/Label';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  eq,
  sub,
  add,
  modulo,
  diffClamp,
} from 'react-native-reanimated';
import {useValues, usePanGestureHandler} from 'react-native-redash';
const {width: size} = Dimensions.get('window');
const candles = data.slice(0, 20);
const values = candles.map((candle) => [candle.low, candle.high]).flat();
const domain = [Math.min(...values), Math.max(...values)];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default () => {
  const {
    gestureHandler,
    position,
    state,
    translation: {x, y},
    velocity,
  } = usePanGestureHandler();
  const caliber = size / candles.length;
  const translateY = diffClamp(y, 0, size);
  const translateX = add(sub(x, modulo(x, caliber), caliber / 2));
  const opacity = eq(state, State.ACTIVE);
  return (
    <View style={styles.container}>
      <View>
        <Header />
        <Animated.View style={{opacity}} pointerEvents="none">
          <Values {...{caliber, candles, translateX}} />
        </Animated.View>
      </View>
      <View>
        <Chart {...{candles, size, caliber, domain}} />
        <PanGestureHandler minDist={0} {...gestureHandler}>
          <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                opacity,
                transform: [{translateY}],
              }}>
              <Line x={size} y={0} />
            </Animated.View>
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                opacity,
                transform: [{translateX}],
              }}>
              <Line x={0} y={size} />
            </Animated.View>
            <Label {...{domain, y: translateY, size, opacity}} />
          </Animated.View>
        </PanGestureHandler>
      </View>
      <Content />
    </View>
  );
};
