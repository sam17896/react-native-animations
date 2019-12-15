// @flow
import * as React from 'react';
import {
  StyleSheet, Platform, Dimensions, View, Text,
} from 'react-native';

import {
  SMALL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, PADDING
} from './Model';

import Animated from 'react-native-reanimated';

const {
  Value, interpolate, Extrapolate, add, multiply
} = Animated;
const { width, height } = Dimensions.get('window');
// Character width is 19.3 on iOS and 19 on Android
const charWidth = Platform.OS === 'ios' ? 19.3 : 19;
const fontSize = 32;
const fontFamily = Platform.OS === 'ios' ? 'Menlo' : 'monospace';

export default class Label extends React.PureComponent {
  render() {
    const {
      index, section, x , y
    } = this.props;
    const opacity = interpolate(x, {
      inputRange: index === 0 ? [0,0, width] : [width * (index - 1), width * index, width * (index + 1)],
      outputRange: [0.5, 1, 0.5],
      extrapolate: Extrapolate.CLAMP
    })

    const labelWidth = interpolate(y, {
      inputRange: [0, height - MEDIUM_HEADER_HEIGHT],
      outputRange: [section.title.length * charWidth, width],
      extrapolate: Extrapolate.CLAMP
    })
    return (
      <Animated.View style={[styles.labelContainer, { opacity }]}>
        <Animated.Text style={[styles.label, { width: labelWidth }]}>{section.title.toUpperCase()}</Animated.Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    ...StyleSheet.absoluteFillObject,
    padding: PADDING,
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    textAlign: 'center',
    fontSize,
    fontFamily,
  },
});
