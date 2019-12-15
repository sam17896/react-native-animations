// @flow
import * as React from 'react';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import Headers from './Headers';
import Pages from './Pages';
import { SMALL_HEADER_HEIGHT } from './Model';

const { width, height } = Dimensions.get('window');

const { event, Value, call} = Animated;

const onScroll = ({x, y}) => event(
  [
    {
      nativeEvent: {
        contentOffset: { x, y },
      }
    }
  ],
  { useNativeDriver: true }
)

export default class Sections extends React.PureComponent {


  constructor(props) {
    super(props);
    this.x = new Value(0);
    this.y = new Value(0);
    this.onScrollX = onScroll({ x: this.x });
    this.onScrollY = onScroll({ y: this.y });

  }

  render() {
    const { onScrollX, onScrollY, x, y } = this;
    const { sections } = this.props;
    return (
      <View style={styles.container}>
        <Animated.Code>
          {
            () => call([x,y], ([x,y]) => console.log([x,y]))
          }
        </Animated.Code>
        <View>
          <Headers {...{ sections, x, y }} />
          <Pages {...{ sections, x, y }} />
        </View>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{ width: width * sections.length }}
          onScroll={onScrollX}
          bounces={false}
          snapToInterval={width}
          decelerationRate="fast"
          horizontal
        >
          <Animated.ScrollView 
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{ height: height + height - SMALL_HEADER_HEIGHT }}
          onScroll={onScrollY}
          bounces={false}
          decelerationRate="fast"
          />
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
