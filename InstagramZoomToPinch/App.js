import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import ReAnimated, {Value, cond, eq, or} from 'react-native-reanimated';
import {useSafeArea} from 'react-native-safe-area-context';
import {
  PinchGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

import {posts} from './src/components/data';
import Footer, {FOOTER_HEIGHT} from './src/components/Footer';
import {HEADER_HEIGHT} from './src/components/Header';
import Header from './src/components/Header';
import Post from './src/components/Post';
import Stories from './src/components/Stories';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const {height} = Dimensions.get('window');
const bottom =
  height -
  FOOTER_HEIGHT +
  // In this app, the status bar on Android is translucent
  (Platform.OS === 'android' ? 64 : 0);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default () => {
  const scrollView = useRef(null);
  // This animation value needs to come from Vanilla Animated
  const y = new Animated.Value(0);
  const paddingTop = HEADER_HEIGHT;
  const paddingBottom = FOOTER_HEIGHT;
  const items = posts.map(post => ({
    post,
    state: new Value(State.UNDETERMINED),
    pinchRef: useRef(null),
  }));
  const pinchRefs = items.map(({pinchRef}) => pinchRef);
  const isActive = or(...items.map(({state}) => eq(state, State.ACTIVE)));
  const opacity = cond(isActive, 0.5, 0);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AnimatedScrollView
        ref={scrollView}
        pinchGestureEnabled={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        waitFor={pinchRefs}
        simultaneousHandlers={pinchRefs}
        contentContainerStyle={{
          paddingTop,
          paddingBottom,
        }}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y}}}], {
          useNativeDriver: true,
        })}>
        <Animated.View
          style={{
            zIndex: 2,
            position: 'absolute',
            left: 0,
            right: 0,
            height: HEADER_HEIGHT,
            transform: [{translateY: y}],
          }}>
          <Header />
        </Animated.View>
        <Stories />
        {items.map(({post, state, pinchRef}) => (
          <Post
            key={post.id}
            {...{post, state, scrollView, pinchRef, pinchRefs}}
          />
        ))}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: bottom,
            height: FOOTER_HEIGHT,
            transform: [{translateY: y}],
          }}>
          <Footer />
        </Animated.View>
        <ReAnimated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 2,
            backgroundColor: 'black',
            opacity,
          }}
          pointerEvents="none"
        />
      </AnimatedScrollView>
    </View>
  );
};
