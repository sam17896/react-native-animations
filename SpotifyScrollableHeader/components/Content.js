import * as React from "react";
import {
  StyleSheet, View, Text, ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated from 'react-native-reanimated';
import { onScroll } from 'react-native-redash';
import { MAX_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import Track from "./Track";
const {
  interpolate,
  Extrapolate
} = Animated
export default ({ album: { artist, tracks }, y }) => {
  const height = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT, 0],
    outputRange: [0, MAX_HEADER_HEIGHT],
    extrapolate: Extrapolate.CLAMP
  });

  const opacity = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP
  });
  return (
    <Animated.ScrollView
      onScroll={onScroll({ y })}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
    >
      <View style={styles.header}>
        <Animated.View
          style={[styles.gradient, { height }]}
        >
          <LinearGradient
          style={StyleSheet.absoluteFill}
          start={{x: 0, y:0.3}}
          end={{x: 0, y: 1}}
          colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
          />
        </Animated.View>
        <View style={styles.artistContainer}>
          <Animated.Text style={[styles.artist, { opacity }]}>{artist}</Animated.Text>
        </View>
      </View>
      <View style={styles.tracks}>
        {
          tracks.map((track, key) => (
            <Track
              index={key + 1}
              {...{ track, key, artist }}
            />
          ))
        }
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: MAX_HEADER_HEIGHT,
  },
  gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  artist: {
    textAlign: "center",
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  tracks: {
    paddingTop: 32,
    backgroundColor: "black",
  },
});
