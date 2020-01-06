// @flow
import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Lottie from 'lottie-react-native';
const { width, height } = Dimensions.get('window');

export default class ProgressWithLottie extends React.Component<{}> {
  player = React.createRef();

  componentDidMount() {
    this.player.current.reset();
    this.player.current.play();
  }

  render(): React.Node {
    return (
      <View style={styles.container}>
        <Lottie
          ref={this.player}
          source={require('./data.json')}
          autoPlay
          loop
        />
        <Icon name="ios-pause" color="#fbe3b9" size={72} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
