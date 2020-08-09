import React, {useRef, useState} from 'react';
import {Animated, Dimensions, FlatList} from 'react-native';

import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  diffClamp,
  onScrollEvent,
  usePanGestureHandler,
  withDecay,
} from 'react-native-redash';
import {CARD_HEIGHT, Cards} from './src/Card';
import WalletCard from './src/WalletCard';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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

const Wallet = () => {
  const y = useLazyRef(() => new Animated.Value(0));
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
    useNativeDriver: true,
  });
  return (
    <AnimatedFlatList
      bounces={false}
      scrollEventThrottle={16}
      data={cards}
      renderItem={({index, item: {type}}) => (
        <WalletCard {...{index, y, type}} />
      )}
      keyExtractor={(item) => `${item.index}`}
      {...{onScroll}}
    />
  );
};

export default Wallet;
