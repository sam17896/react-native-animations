
import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import WeightTarget from './components/WeightTarget';

const App = () => {
  return (
    <WeightTarget weight={84} height={1.77} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
