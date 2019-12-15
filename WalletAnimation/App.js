/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  View,
} from 'react-native';
import Card, { cardHeight, cardTitle, cardPadding } from './Card';
import Animated from 'react-native-reanimated'


const {
  height,
  width
} = Dimensions.get('window')

const {
  Value, event, Extrapolate
} = Animated;

const cards = [
  {
    name: "Shot",
    color: "#a9d0b6",
    price: "30 CHF"
  },
  {
    name: "Juice",
    color: "#e9bbd1",
    price: "64 CHF"
  },
  {
    name: "Mighty Juice",
    color: "#eba65c",
    price: "80 CHF"
  },
  {
    name: "Sandwich",
    color: "#95c3e4",
    price: "85 CHF"
  },
  {
    name: "Combi",
    color: "#1c1c1c",
    price: "145 CHF"
  },
  {
    name: "Signature",
    color: "#a390bc",
    price: "92 CHF"
  },
  {
    name: "Coffee",
    color: "#fef2a0",
    price: "47 CHF"
  }
];


const App = () => {
  const y = new Value(0)
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>
        {
          cards.map((card, i) => {
            const inputRange = [-cardHeight, 0];
            const outputRange = [
              cardHeight * i,
              (cardHeight - cardTitle) * -i
            ];
            if (i > 0) {
              inputRange.push(cardPadding * i);
              outputRange.push((cardHeight - cardPadding) * -i);
            }
            const translateY = y.interpolate({
              inputRange,
              outputRange,
              extrapolateRight: "clamp"
            });
            return(
            <Animated.View  key={card.name}  style={{
              transform: [{ translateY }]
            }}>
              <Card 
               {...card} />
            </Animated.View>)
          })
        }
        </View>
        <Animated.ScrollView 
          scrollEventThrottle={16}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y }
                }
              }
            ],
            { useNativeDriver: true }
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 16
  },
  container: {
    flex: 1
  },
  content: {
    height: height * 2
  },
})

export default App;
