/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';
import Progress from './components/progress';
import ProgressWithLottie from './components/ProgressLottie';

const App = () => {
  return (
    <View style={styles.container}>
        <Image source={require('./assets/bg.png')} style={styles.background} />
        <Progress/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
});

export default App;
