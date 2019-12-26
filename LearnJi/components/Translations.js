import * as React from "react";
import {
  View, StyleSheet, Dimensions, Text, SafeAreaView,
} from "react-native";
import Animated from 'react-native-reanimated';

import AnimatedText from "./AnimatedText";
import Translation from "./Translation";

const {
  Value, debug, multiply, max,
} = Animated;
const { width } = Dimensions.get("window");

const colors = {
  de: "#3e3a3f",
  it: "#448d5d",
  fr: "#638fcf",
  es: "#803758",
  pt: "#e74446",
  zhHant: "#d1413d",
  ko: "#1f5593",
  ja: "#f9dde0",

};

const flags = {
  de: "🇩🇪",
  it: "🇮🇹",
  fr: "🇫🇷",
  es: "🇪🇸",
  pt: "🇵🇹",
  zhHant: "🇨🇳",
  ko: "🇰🇷",
  ja: "🇯🇵",
};


export default class Translations extends React.PureComponent {
  render() {
    const {
      max: maxVal, y, slider, index
    } = this.props;

    const translateY = max(multiply(y, -1), maxVal);
    const translateX = multiply(slider, -1);
    return (
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          flexDirection: "row",
          transform: [
            { translateY },
            { translateX }
          ]
        }}
        horizontal
        snapPoint={width}
      >
        {
          Object.keys(colors).map(lang => (
            <SafeAreaView key={lang} style={{ width, height: "100%", backgroundColor: colors[lang] }}>
              <Text style={styles.flag}>{flags[lang]}</Text>
              <Translation style={styles.translation} {...{lang, index}} />
            </SafeAreaView>
          ))
        }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "red",
  },
  flag: {
    textAlign: "center",
    fontSize: 24,
  },
  translation: {
    margin: 48,
    textAlign: "center",
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
  },
});
