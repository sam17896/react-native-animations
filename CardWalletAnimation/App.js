import React, {useRef, useState} from 'react';
import {Dimensions, View, FlatList, StyleSheet} from 'react-native';
import Animated, {interpolate, Extrapolate, add} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  diffClamp,
  onScrollEvent,
  usePanGestureHandler,
  withDecay,
  withOffset,
} from 'react-native-redash';
import Card, {CARD_HEIGHT, Cards} from './src/Card';

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
  container: {
    flex: 1,
  },
  card: {
    marginVertical: 16,
    alignSelf: 'center',
  },
});

const Wallet = () => {
  const [containerHeight, setContainerHeight] = useState(height);
  const visibleCards = Math.floor(containerHeight / HEIGHT);
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
  const y = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state,
    }),
    -HEIGHT * cards.length + visibleCards * HEIGHT,
    0,
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: {height: h},
          },
        }) => setContainerHeight(h)}>
        {cards.map(({type}, index) => {
          const positionY = add(y, index * HEIGHT);
          const isDisappearing = -HEIGHT;
          const isOnTop = 0;
          const isBottom = HEIGHT * (visibleCards - 1);
          const isAppearing = HEIGHT * visibleCards;
          const translateYWithScale = interpolate(positionY, {
            inputRange: [isBottom, isAppearing],
            outputRange: [0, -HEIGHT / 4],
            extrapolate: Extrapolate.CLAMP,
          });
          const translateY = add(
            interpolate(y, {
              inputRange: [-HEIGHT * index, 0],
              outputRange: [-HEIGHT * index, 0],
              extrapolate: Extrapolate.CLAMP,
            }),
            translateYWithScale,
          );
          const scale = interpolate(positionY, {
            inputRange: [isDisappearing, isOnTop, isBottom, isAppearing],
            outputRange: [0.5, 1, 1, 0.5],
            extrapolate: Extrapolate.CLAMP,
          });

          const opacity = interpolate(positionY, {
            inputRange: [isDisappearing, isOnTop, isBottom, isAppearing],
            outputRange: [0, 1, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View
              style={[
                styles.card,
                {opacity, transform: [{translateY}, {scale}]},
              ]}
              key={index}>
              <Card {...{type}} />
            </Animated.View>
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Wallet;
