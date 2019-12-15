/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StatusBar,
  SafeAreaView
} from 'react-native';
import Accordion from './components/Accordion';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Accordion />
    </>
  );
};


export default App;
