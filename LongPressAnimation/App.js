/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import TapGesture from './src/components/TapGesture';

const App = () => {
  return (
    <>
      <TapGesture />
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
