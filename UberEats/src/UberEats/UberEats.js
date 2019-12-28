import React, { useState, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated from 'react-native-reanimated';
import HeaderImage from "./HeaderImage";
import Content, { defaultTabs } from "./Content";
import Header from "./Header";
import { useValues, onScroll } from "react-native-redash";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default () => {
  const scrollView = useRef(null);
  const [tabs, setTabs] = useState(defaultTabs);
  const [ y ] = useValues([0], []);
  return (
    <View style={styles.container}>
      <HeaderImage {...{ y }} />
      <Animated.ScrollView 
        style={StyleSheet.absoluteFill} 
        onScroll={onScroll({ y })}
        ref={scrollView}
        scrollEventThrottle={1}>
        <Content
          onMeasurement={(index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
        />
      </Animated.ScrollView>
      <Header {...{ tabs, y, scrollView }} />
    </View>
  );
};
