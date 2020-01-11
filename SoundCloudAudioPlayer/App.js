/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Image
} from 'react-native';
import Waveform from './src/components/Waveform';
import waveform from './data/waveform.json';
const {
  event,
  Value
} = Animated;
const App= () => {
  const [x, setX] = useState(new Value(0));

  return (
    <View style={styles.container}>
      <Image source={require('./data/cover.jpeg')} style={styles.cover} />
      <View style={styles.progress}>
        <View>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            onScroll={event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x }
                  }
                }
              ], {
                useNativeDriver: true
              }
            )}
            bounces={false}
            >
            <Waveform color="white" {...{waveform}} />
            <View style={StyleSheet.absoluteFill}>
              <Waveform color="#ee742f" progress={x} {...{waveform}} />
            </View>
          </Animated.ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'flex-end'
 },
 cover: {
   ...StyleSheet.absoluteFillObject,
   width: null,
   height: null
 },
 progress: {
  flex: 0.5,
 }
});

export default App;
