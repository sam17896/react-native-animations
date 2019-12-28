/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const { width, height } = Dimensions.get('window');

import Animated from 'react-native-reanimated';

const {
  event,
  Value,
  debug,
  call,
  interpolate,
  Extrapolate
} = Animated;

const onScroll = (contentOffset) => event(
  [
    {
      nativeEvent: {
        contentOffset,
      },
    },
  ],
  { useNativeDriver: true },
);

const BoxHeight = 100;
const BoxWidth = width / 3;
const offset  = width / 2;

const App = () => {
  const x = new Value(0);
  const y = new Value(0);
  const test = x => console.log(x);
  const translateX = interpolate(x, {
    inputRange: [0, BoxWidth],
    outputRange:[offset, offset + ( -1 * BoxWidth)]
  });
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Animated.Code>
          {
            () => call([translateX], test)
          }
        </Animated.Code>
        <View style={styles.container}>
          <View style={styles.boxes}>
            {[1,2,3,4,5,6,7,8,9,10].map((elem, i) => {
              const previousPosition = (i -1) * BoxWidth;
              const currentPosition = i * BoxWidth;
              const nexPosition = (i + 1) * BoxWidth;
              const inputRange = [previousPosition, currentPosition, nexPosition];
              const scale = interpolate(x, {
                inputRange,
                outputRange: [1, 1.6, 1],
                extrapolate: Extrapolate.CLAMP
              })
              const opacity = interpolate(x, {
                inputRange,
                outputRange: [0.5, 1, 0.5],
                extrapolate: Extrapolate.CLAMP
              });
              return(
                <Animated.View style={[styles.box, {
                  opacity,
                  transform: [
                    {translateX},
                    { scale }
                  ]
                }]}>
                  <Text style={{ fontSize: 92 }}>{elem}</Text>
                </Animated.View>
              )
            })}
          </View>
        </View>
       
        <Animated.ScrollView
          horizontal
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 64,
            height: BoxHeight
          }}
          contentContainerStyle={styles.horizontalScrollView}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={BoxWidth}
          scrollEventThrottle={1}
          onScroll={onScroll({ x })}
        /> 
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },  
  box: {
    width: BoxWidth,
    height: BoxHeight
  },
  boxes: {
    flexDirection: 'row'
  },  
  scrollView: {
    height: height * 2,
    width: width
  },
  horizontalScrollView: {
    width: BoxWidth * 12,
    height: BoxHeight
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
