import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});

export default ({type}) => {
  let source;
  switch (type) {
    case 'Card1':
      source = require('./assets/card1.png');
      break;
    case 'Card2':
      source = require('./assets/card2.png');
      break;
    case 'Card3':
      source = require('./assets/card3.png');
      break;
    case 'Card4':
      source = require('./assets/card4.png');
      break;
    case 'Card5':
      source = require('./assets/card5.png');
      break;
    case 'Card6':
      source = require('./assets/card6.png');
      break;
    default:
      throw Error('Invalid card style');
  }
  return <Image style={styles.card} {...{source}} />;
};
