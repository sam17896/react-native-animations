// @flow
import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { SMALL_HEADER_HEIGHT } from './Model';
import MockEntry from './MockEntry';
import MockCard from './MockCard';

const { multiply }  = Animated;

const { height, width } = Dimensions.get('window');
export default class Pages extends React.PureComponent {
  render() {
    const { sections, x, y} = this.props;
    const translateX = multiply(x, -1);
    const translateY = multiply(y, -1);
    return (
      <Animated.View style={[styles.container, {
        transform: [
          { translateX },
          { translateY },
        ]
      }]}>
        {
        sections.map(({ image }, key) => (
          <View style={styles.page} {...{ key }}>
            <MockEntry {...{ image }} />
            <MockCard {...{ image }} />
            <MockEntry {...{ image }} />
            <MockEntry {...{ image }} />
            <MockEntry {...{ image }} />
            <MockEntry {...{ image }} />
          </View>
        ))
      }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  page: {
    backgroundColor: 'white',
    width,
    height: height - SMALL_HEADER_HEIGHT,
  },
});
