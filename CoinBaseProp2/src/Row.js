import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import ReText from './ReText';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 20,
    color: 'grey',
  },
  value: {
    fontSize: 20,
    fontVariant: ['tabular-nums'],
  },
});

const Row = ({label, value, color}) => {
  const style = useAnimatedStyle(() => ({color: color.value}));
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ReText style={[styles.value, style]} {...{text: value}} />
    </View>
  );
};

export default Row;
