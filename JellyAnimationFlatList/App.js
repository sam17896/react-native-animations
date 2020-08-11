import React, {useRef} from 'react';
import {Dimensions, FlatList, View, StyleSheet} from 'react-native';
import Card, {CARD_HEIGHT} from './src/Card';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  withSpring,
} from 'react-native-reanimated';

const useLazyRef = (initializer) => {
  const ref = useRef();
  if (ref.current === undefined) {
    ref.current = initializer();
  }
  return ref.current;
};
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
  const direction = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onEndDrag: () => (direction.value = 0),
    onScroll: (event, ctx) => {
      const now = new Date().getTime();
      const {y} = event.contentOffset;
      const dt = now - (ctx?.time ?? 1);
      const dy = y - (ctx?.y ?? 0);
      const v = dy / dt;
      direction.value = dt == 0 ? 0 : Math.sign(v);
      ctx.time = now;
      ctx.y = y;
    },
  });
  return (
    <Animated.ScrollView scrollEventThrottle={1} {...{onScroll}}>
      {cards.map(({type}, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const style = useAnimatedStyle(() => {
          const skewY = withSpring(
            interpolate(
              direction.value,
              [-1, 0, 1],
              [-Math.PI / 18, 0, Math.PI / 18],
            ),
          );
          return {
            transform: [{skewY}],
          };
        });
        return (
          <Animated.View key={index} style={[styles.card, style]}>
            <Card type={type} />
          </Animated.View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default Wallet;
