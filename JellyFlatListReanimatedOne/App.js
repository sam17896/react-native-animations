import React, {useRef} from 'react';
import {Dimensions, FlatList, View, StyleSheet, ScrollView} from 'react-native';
import Card, {CARD_HEIGHT} from './src/Card';

import {useScrollHandler, useClock, useDiff} from 'react-native-redash';
import Animated, {
  useValue,
  useCode,
  startClock,
  divide,
  set,
  interpolate,
} from 'react-native-reanimated';

const {height} = Dimensions.get('window');
const MARGIN = 16;
const HEIGHT = CARD_HEIGHT + MARGIN * 2;
const cards = [
  {
    index: 1,
    type: 'Card1',
  },
  {
    index: 2,
    type: 'Card2',
  },
  {
    index: 3,
    type: 'Card3',
  },
  {
    index: 4,
    type: 'Card4',
  },
  {
    index: 5,
    type: 'Card5',
  },
  {
    index: 7,
    type: 'Card6',
  },
];

const styles = StyleSheet.create({
  card: {
    marginVertical: MARGIN,
    alignSelf: 'center',
  },
});

const Wallet = () => {
  const clock = useClock();
  const velocity = useValue(0);
  const {scrollHandler, y} = useScrollHandler();
  const dt = useDiff(clock);
  const dy = useDiff(y);
  useCode(() => [startClock(clock), set(velocity, divide(dy, dt))], []);
  console.log(velocity);
  return (
    <Animated.ScrollView {...scrollHandler}>
      {cards.map(({type}, index) => {
        const skewY = interpolate(velocity, {
          inputRange: [-10, 0, 10],
          outputRange: [-Math.PI / 9, 0, Math.PI / 9],
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.card,
              {
                transform: [{skewY}],
              },
            ]}>
            <Card type={type} />
          </Animated.View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default Wallet;
