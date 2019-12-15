/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import Tabbar from './components/Tabbar';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <Tabbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ea3345",
    justifyContent: 'flex-end'
  }
});

export default App;
