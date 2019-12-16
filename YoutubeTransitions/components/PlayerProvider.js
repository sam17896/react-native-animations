// @flow
import * as React from 'react';
import {
  View, StyleSheet, Dimensions, StatusBar,
} from 'react-native';

import PlayerContext from './PlayerContext';
import VideoModal from './VideoModal';
const { height } = Dimensions.get('window');
import Animated, { Easing } from 'react-native-reanimated';

const {
  Value
} = Animated;

export default class PlayerProvider extends React.PureComponent {
  
  animation = new Value(0);

  state = {
    video: null,
  };

  setVideo = (video) => {
    this.setState({ video }, this.toggleVideo);
  };

  toggleVideo = () => Animated.timing(this.animation, {
    duration: 300,
    toValue: 1,
    easing: Easing.inOut(Easing.ease)
  }).start();

  render() {
    const { setVideo, animation } = this;
    const { children } = this.props;
    const { video } = this.state;
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0]
    });
    return (
      <PlayerContext.Provider value={{ video, setVideo }}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <View style={StyleSheet.absoluteFill}>
            {children}
          </View>
          <Animated.View style={{
            transform: [
              { translateY }
            ]
          }}>
            {
              video && <VideoModal {...{ video }} />
            }
          </Animated.View>
        </View>
      </PlayerContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
