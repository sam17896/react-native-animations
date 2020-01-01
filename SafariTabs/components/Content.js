import React, { useMemo, useRef } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { OVERVIEW } from "./Model";
import { WebView } from 'react-native-webview';
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from 'react-native-reanimated';
import { onGestureEvent, spring, snapPoint, approximates } from "react-native-redash";
const { width } = Dimensions.get("window");
const EXTREMITY = width * 1.1;
const snapPoints = [-EXTREMITY, 0, EXTREMITY];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden"
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center"
  },
  webView: { flex: 1 }
});

const {
  Value,
  useCode,
  block,
  cond,
  abs,
  call,
  eq,
  neq,
  greaterOrEq,
  greaterThan,
  lessOrEq,
  lessThan
} = Animated;


export default ({ tab: { uri, id: title }, selectedTab, closeTab }) => {
  const offset = selectedTab === OVERVIEW ? 0 : 64;
  const {gestureHandler, translateX} = useMemo(() => {
    const translationX = new Value(0);
    const velocityX = new Value(0);
    const state = new Value(State.UNDETERMINED)
    return {
      gestureHandler: onGestureEvent({
        translationX,
        velocityX,
        state
      }),
      translateX: spring(translationX, state, 
        snapPoint(translationX, velocityX, snapPoints))
    }
  }, [])
  useCode(() => block([
    cond(approximates(abs(translateX), EXTREMITY), call([], closeTab))
  ]), [closeTab])
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={[styles.container, {
        transform: [
          {translateX}
        ]
      }]}>
        <View
          style={{
            paddingTop: offset,
            height: 32 + offset,
            backgroundColor: "#fefefe",
            justifyContent: "center"
          }}
        >
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.webView}>
        <WebView source={{ uri }} style={styles.webView} />
        <View style={StyleSheet.absoluteFill} />
      </View>
    </Animated.View>
    </PanGestureHandler>

  );
};
