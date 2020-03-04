import * as _ from "lodash";
import React from "react";
import {

  StyleSheet, View, Dimensions, Text
} from "react-native";
import Animated from 'react-native-reanimated';

import Emojis from "./components/Emojis";
import { EMOJI_WIDTH } from "./components/Model";
import Translations from "./components/Translations";
import { onScroll, lookup } from "./components/AnimationHelpers";
import AnimatedText from "./components/AnimatedText";
import Translation from "./components/Translation";

const emojis = require("./assets/emoji-db.json");

const emojiList = Object.keys(emojis);

const { height, width } = Dimensions.get("window");
const horizontalPanHeight = EMOJI_WIDTH;
const verticalPanHeight = height / 2 - horizontalPanHeight / 2;
const numberOfEmojis = emojiList.length;
const numberOfLanguages = Object.keys(emojis[emojiList[0]]).length;

const {
  Value,
  divide,
  onChange,
  set,
  round
} = Animated;

export default () => {
  const x = new Value(0);
  const y = new Value(0);
  const slider = new Value(0);
  const index = round(divide(x, EMOJI_WIDTH));
  const translations = {
    en: new Value(emojis[emojiList[0]].en),
    de: new Value(emojis[emojiList[0]].de),
    it: new Value(emojis[emojiList[0]].it),
    fr: new Value(emojis[emojiList[0]].fr),
    es: new Value(emojis[emojiList[0]].es),
    pt: new Value(emojis[emojiList[0]].pt),
    zhHant: new Value(emojis[emojiList[0]].zh_Hant),
    ko: new Value(emojis[emojiList[0]].ko),
    ja: new Value(emojis[emojiList[0]].ja),
  };
  return (
    <View style={styles.container}>
      <Animated.Code>
        {
          () => onChange(index, Object.keys(translations).map(lang => set(translations[lang], lookup(emojiList.map(emoji => emojis[emoji][lang]), index))))
        }
      </Animated.Code>
      <View style={styles.container}>
        <Translations
          max={(verticalPanHeight - 150) * -1}
          {...{ emojis, translations, y, slider, index }}
        />
      </View>
      <Emojis {...{ emojis, x }} />
      <View style={styles.container}>
        <Translation style={styles.english} lang="en" {...{ index }} />
      </View>
      <Animated.ScrollView
        style={styles.verticalPan}
        contentContainerStyle={styles.verticalPanContent}
        onScroll={onScroll({ y })}
        showsVerticalScrollIndicator={false}
        snapToInterval={verticalPanHeight}
        decelerationRate={"fast"}
        scrollEventThrottle={1}
        vertical
      >
        <Animated.ScrollView
          onScroll={onScroll({ x: slider })}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContent}
          scrollEventThrottle={1}
          horizontal
          snapToInterval={width}
          decelerationRate={"fast"}
          style={StyleSheet.absoluteFill}
        />
      </Animated.ScrollView>
      <Animated.ScrollView
        style={styles.horizontalPan}
        contentContainerStyle={styles.horizontalPanContent}
        onScroll={onScroll({ x })}
        snapToInterval={EMOJI_WIDTH}
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        horizontal
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalPan: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: verticalPanHeight
  },
  verticalPanContent: {
    height: verticalPanHeight * 2
  },
  horizontalPan: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: verticalPanHeight,
    height: horizontalPanHeight
  },
  horizontalPanContent: {
    width: EMOJI_WIDTH * numberOfEmojis
  },
  sliderContent: {
    width: width * (numberOfLanguages - 1)
  },
  english: {
    margin: 48,
    textAlign: "center",
    fontSize: 48,
    color: "black",
    fontWeight: "bold",
  },
});

