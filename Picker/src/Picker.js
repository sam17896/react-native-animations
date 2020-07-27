import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  multiply,
  cos,
  sub,
  asin,
  divide,
} from 'react-native-reanimated';
import {useValue, translateZ} from 'react-native-redash';
import MaskedView from '@react-native-community/masked-view';

import GestureHandler from './GestureHandler';
import {VISIBLE_ITEMS, ITEM_HEIGHT} from './Constants';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: 0.61 * width,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    //fontFamily: 'SFProText-Semibold',
    fontSize: 24,
    lineHeight: ITEM_HEIGHT,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
const perspective = 600;
const RADIUS_REL = VISIBLE_ITEMS * 0.5;
const RADIUS = RADIUS_REL * ITEM_HEIGHT;

const Picker = ({values, defaultValue}) => {
  const translateY = useValue(0);
  const masked = (
    <Animated.View
      style={{
        transform: [{translateY}],
      }}>
      {values.map((v, i) => {
        const y = interpolate(
          divide(sub(translateY, ITEM_HEIGHT * 2), -ITEM_HEIGHT),
          {
            inputRange: [i - RADIUS_REL, i, i + RADIUS_REL],
            outputRange: [-1, 0, 1],
            extrapolate: Extrapolate.CLAMP,
          },
        );
        const rotateX = asin(y);
        const z = sub(multiply(RADIUS, cos(rotateX)), RADIUS);
        return (
          <Animated.View
            key={v.value}
            style={[
              styles.item,
              {
                transform: [
                  {perspective},
                  {rotateX},
                  translateZ(perspective, z),
                ],
              },
            ]}>
            <Text style={styles.label}>{v.label}</Text>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
  return (
    <View style={styles.container}>
      <MaskedView {...{maskElement: masked}}>
        <View style={{backgroundColor: 'grey', height: ITEM_HEIGHT * 2}} />
        <View style={{backgroundColor: 'white', height: ITEM_HEIGHT}} />
        <View style={{backgroundColor: 'grey', height: ITEM_HEIGHT * 2}} />
      </MaskedView>
      <GestureHandler {...{value: translateY, max: values.length}} />
    </View>
  );
};

export default Picker;
