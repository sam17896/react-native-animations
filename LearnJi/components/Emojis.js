import * as React from "react";
import {
  View, Text, StyleSheet,
} from "react-native";
import Animated from 'react-native-reanimated';

import {
  Emojis, EMOJI_WIDTH, EMOJIS_OFFSET, FONT_SIZE, PADDING,
} from "./Model";


const {
  Value,
  interpolate,
  Extrapolate
} = Animated;

export default class extends React.PureComponent {
  render() {
    const { emojis, x } = this.props;
    const translateX = interpolate(x, {
      inputRange: [0, EMOJI_WIDTH],
      outputRange:[EMOJIS_OFFSET,EMOJIS_OFFSET + ( -1 * EMOJI_WIDTH)]
    });
    return (
      <View style={styles.container}>
        <View style={styles.emojis}>
          {
            Object.keys(emojis).map((emoji, i) => {
              const previousPosition = (i -1) * EMOJI_WIDTH;
              const currentPosition = i * EMOJI_WIDTH;
              const nexPosition = (i + 1) * EMOJI_WIDTH;
              const inputRange = [previousPosition, currentPosition, nexPosition];
              const scale = interpolate(x, {
                inputRange,
                outputRange: [1, 1.3, 1],
                extrapolate: Extrapolate.CLAMP
              })
              const opacity = interpolate(x, {
                inputRange,
                outputRange: [0.5, 1, 0.5],
                extrapolate: Extrapolate.CLAMP
              });
              return(
                <Animated.View
                  key={emoji}
                  style={[styles.emoji, {
                    opacity,
                    transform: [
                       { translateX },
                      { scale }
                    ]
                  }]}
                >
                  <Text
                    style={{ fontSize: FONT_SIZE }}
                  >
                    {emoji}
                  </Text>
                </Animated.View>
              )
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  emojis: {
    flexDirection: "row",
  },
  emoji: {
    width: EMOJI_WIDTH,
    padding: PADDING,
  },
});
