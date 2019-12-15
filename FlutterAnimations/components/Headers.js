// @flow
import * as React from 'react';
import { View, Dimensions } from 'react-native';

import {
  SMALL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, PADDING, CURSOR_WIDTH,
} from './Model';
import Header from './Header';
import Label from './Label';
import Cursor from './Cursor';
import Animated from 'react-native-reanimated';

const { Value, interpolate, Extrapolate, multiply, add } = Animated;
const backgroundColor = '#343761';
const { width, height } = Dimensions.get('window');

export default class Headers extends React.PureComponent {

  render() {
    const { sections, x , y } = this.props;
    const FULL_HEADER_HEIGHT = height / sections.length;
    return (
      <View style={{ height, width: sections.length * width, backgroundColor }}>
        {
          sections.map((section, key ) => 
            {
              const translateY = interpolate(y, {
                inputRange: [0, height - MEDIUM_HEADER_HEIGHT],
                outputRange: [FULL_HEADER_HEIGHT * key, 0],
                extrapolate: Extrapolate.CLAMP
              })

              const translateX1 = interpolate(y, {
                inputRange: [0, height - MEDIUM_HEADER_HEIGHT],
                outputRange: [x, key * width],
                extrapolate: Extrapolate.CLAMP
              })

              const translateX2 = multiply(x, -1);
              const translateX = add(translateX1, translateX2);

              const HeaderHeight = interpolate(y, {
                inputRange: [0, height - MEDIUM_HEADER_HEIGHT, height- SMALL_HEADER_HEIGHT],
                outputRange: [FULL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, SMALL_HEADER_HEIGHT],
                extrapolate: Extrapolate.CLAMP
              })
              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width,
                    height: HeaderHeight,
                    transform: [
                      { translateY },
                      { translateX }
                    ]
                  }}
                    {...{ key }}
                >
                  <Header index={key} {...{ section }} />
                </Animated.View>
              )
            }
          )
        }
        {
          sections.map((section, key ) => 
            {
              const translateY = interpolate(y, {
                inputRange: [0, height - MEDIUM_HEADER_HEIGHT],
                outputRange: [FULL_HEADER_HEIGHT * key, 0],
                extrapolate: Extrapolate.CLAMP
              })

              const translateX1 = interpolate(y, {
                inputRange: [0, height - MEDIUM_HEADER_HEIGHT],
                outputRange: [x, key * width],
                extrapolate: Extrapolate.CLAMP
              })

              const translateX2 = multiply(x, -1);
              const translateX = add(translateX1, translateX2);

              const HeaderHeight = interpolate(y, {
                inputRange: [0, height - MEDIUM_HEADER_HEIGHT, height- SMALL_HEADER_HEIGHT],
                outputRange: [FULL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, SMALL_HEADER_HEIGHT],
                extrapolate: Extrapolate.CLAMP
              })
              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width,
                    height: HeaderHeight,
                    transform: [
                      { translateY },
                      { translateX }
                    ]
                  }}
                    {...{ key }}
                >
                  <Label index={key} {...{ section, x, y }} />
                </Animated.View>
              )
            }
          )
        }
        {
          sections.map((section, key ) => 
            {
              
              const HeaderHeight = interpolate(y, {
                inputRange: [0, height - MEDIUM_HEADER_HEIGHT, height- SMALL_HEADER_HEIGHT],
                outputRange: [FULL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, SMALL_HEADER_HEIGHT],
                extrapolate: Extrapolate.CLAMP
              })

              const opacity = interpolate(x, {
                inputRange: key === 0 ? [0,0, width] : [width * (key - 1), width * key, width * (key + 1)],
                outputRange: [0.5, 1, 0.5],
                extrapolate: Extrapolate.CLAMP
              })
              const translateY = interpolate(y, {
                inputRange: [0, height - MEDIUM_HEADER_HEIGHT],
                outputRange: [multiply(HeaderHeight, key), 0],
                extrapolate: Extrapolate.CLAMP
              })
              const translateX1 = interpolate(y, {
                inputRange: [0, height - MEDIUM_HEADER_HEIGHT],
                outputRange: [-width/2 + CURSOR_WIDTH / 2 + PADDING, 0],
                extrapolate: Extrapolate.CLAMP
              });
              const translateX2 = interpolate(y, {
                inputRange: [0, height - MEDIUM_HEADER_HEIGHT, height - SMALL_HEADER_HEIGHT],
                outputRange: [0, (width/ 2) * key, (CURSOR_WIDTH + PADDING) * key - (width / 4) + (PADDING * 2) ],
                extrapolate: Extrapolate.CLAMP
              });
              const translateX = add(translateX1, translateX2);
              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width,
                    opacity,
                    height: HeaderHeight,
                    transform: [
                      { translateY },
                      { translateX }
                    ]
                  }}
                    {...{ key }}
                >
                  <Cursor index={key} {...{ section, x, y }} />
                </Animated.View>
              )
            }
          )
        }
      </View>
    );
  }
}
