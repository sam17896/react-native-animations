import React, { useState, useRef, useMemo } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, { Easing, Transition, Transitioning } from 'react-native-reanimated';
import Card, { CARD_WIDTH, CARD_HEIGHT } from "./Card";
import CheckIcon from "./CheckIcon";
import Thumbnail from "./Thumbnail";
import { runTiming, bInterpolate, max } from "react-native-redash";

const {
  Value,
  useCode,
  multiply,
  eq,
  neq,
  set,
  call,
  concat,
  not,
  cond,
  and,
  interpolate,
  block,
  greaterOrEq,
  Clock,
  startClock,
  stopClock,
  add,
  Extrapolate,
  clockRunning
} = Animated;

const INITIAL_INDEX = -1;

const timing = (animation, clock) => set(
  animation, runTiming(clock, 0, {
    toValue: 1,
    duration: 400,
    easing: Easing.linear
  })
)


export default ({ cards }) => {

  const container = useRef();
  const [selectedCardState, setSelectCardState] = useState(INITIAL_INDEX);
  const {
    selectedCard,
    nextIndex,
    cardZIndexes,
    cardRotations,
    cardTranslations,
    animation,
    clock,
    translateX,
    isGroupingAnimationDone,
    shouldUpdateZIndexes
  } = useMemo(
    () => ({
      selectedCard: new Value(INITIAL_INDEX),
      nextIndex: new Value(INITIAL_INDEX),
      cardZIndexes: cards.map(() => new Value(0)),
      cardRotations: cards.map(() => new Value(0)),
      cardTranslations: cards.map(() => new Value(0)),
      animation: new Value(0),
      clock: new Clock(),
      translateX: new Value(CARD_WIDTH),
      isGroupingAnimationDone: new Value(0),
      shouldUpdateZIndexes: new Value(1)
    }),
    [cards]
  );

  useCode(() => block([
    cond(eq(selectedCard, INITIAL_INDEX), [
      timing(animation, clock),
      set(cardRotations[0], bInterpolate(animation, 0, -15)),
      set(cardRotations[1], 0),
      set(cardRotations[2], bInterpolate(animation, 0, 15)),
    ]),
    cond(and(neq(selectedCard, INITIAL_INDEX), not(isGroupingAnimationDone, 1)), [
      timing(animation, clock),
      set(translateX, bInterpolate(animation, translateX, 0)),
      set(cardRotations[0], bInterpolate(animation, cardRotations[0], -15 / 2)),
      set(cardRotations[1], bInterpolate(animation, cardRotations[1], 15 / 2)),
      set(cardRotations[2], bInterpolate(animation, cardRotations[2], 0)),
      cond(not(clockRunning(clock)), set(isGroupingAnimationDone, 1))
    ]),
    ...cards.map((card, index) =>
      cond(and(eq(selectedCard, index), eq(isGroupingAnimationDone, 1)), [
        timing(animation, clock),
        ...cards.map((_card, i) => i)
          .filter((_card, i) => index !== i)
          .map((absoluteIndex, i) =>
            set(
              cardRotations[absoluteIndex],
              bInterpolate(animation, cardRotations[absoluteIndex],
                7.5 * (i % 2 === 0 ? -1 : 1)))
          ),
        set(cardRotations[index],
          interpolate(animation, {
            inputRange: [0, 0.5, 1],
            outputRange: [0, 45, 0]
          })
        ),
        set(cardTranslations[index],
          interpolate(animation, {
            inputRange: [0, 0.5, 1],
            outputRange: [0, -CARD_HEIGHT * 1.5, 1],
            extrapolate: Extrapolate.CLAMP
          })
        ),
        cond(and(greaterOrEq(animation, 0.5), shouldUpdateZIndexes, [
          set(cardZIndexes[index], add(max(...cardZIndexes), 1)),
          set(shouldUpdateZIndexes, 0)
        ])),
        cond(not(clockRunning(clock)), set(shouldUpdateZIndexes, 1))
      ]
      ))
  ]), [cards]);

  const selectCard = (index) => {
    if (container && container.current) {
      container.current.animateNextTransition();
    }
    if(index !== selectedCardState) {
      setSelectCardState(index);
      selectedCard.setValue(index)
    }
  };
  return (
    <Transitioning.View  ref={container} style={styles.container}
      transition={<Transition.In type="fade" durationMs={100} />}
    >
      <View style={styles.cards}>
        {cards.map((card, index) => {
          const translateY = cardTranslations[index];
          const rotateZ = concat(cardRotations[index], "deg");
          const elevation = cardZIndexes[index];
          const zIndex = cardZIndexes[index];
          return (
            <Animated.View
              key={card.id}
              style={{
                elevation,
                zIndex,
                ...StyleSheet.absoluteFillObject,
                transform: [
                  { translateX: multiply(translateX, -1) },
                  { rotateZ },
                  { translateX },
                  { translateY }
                ]
              }}
            >
              <Card key={card.id} {...{ card }} />
            </Animated.View>
          );
        })}
      </View>
      <SafeAreaView>
        {cards.map(({ id, name, color, thumbnail }, index) => (
          <RectButton key={id} onPress={() => selectCard(index)}>
            <View style={styles.button} accessible>
              <Thumbnail {...{ thumbnail }} />
              <View style={styles.label}>
                <Text>{name}</Text>
              </View>
              { selectedCardState == index && 
              <CheckIcon {...{ color }} />}
            </View>
          </RectButton>
        ))}
      </SafeAreaView>
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cards: {
    flex: 1,
    backgroundColor: "#f4f6f3"
  },
  button: {
    flexDirection: "row"
  },
  label: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#f4f6f3",
    justifyContent: "center"
  }
});
