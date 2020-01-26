// @flow
import React from 'react';
import { StatusBar, View, ActivityIndicator, StyleSheet } from 'react-native';
// Two implementations of the story components.
// One using linear interpolation which doesn't make it a perfect cube and one with setNativeProps
 import { Stories } from './components';

const stories = [
  {
    id: '2',
    source: require('./assets/stories/2.jpg'),
    user: 'derek.russel',
    avatar: require('./assets/avatars/derek.russel.png'),
  },
  {
    id: '4',
    source: require('./assets/stories/4.jpg'),
    user: 'jmitch',
    avatar: require('./assets/avatars/jmitch.png'),
  },
  {
    id: '5',
    source: require('./assets/stories/5.jpg'),
    user: 'monicaa',
    avatar: require('./assets/avatars/monicaa.png'),
  },
  {
    id: '3',
    source: require('./assets/stories/3.jpg'),
    user: 'alexandergarcia',
    avatar: require('./assets/avatars/alexandergarcia.png'),
  },
  {
    id: '1',
    source: require('./assets/stories/1.jpg'),
    user: 'andrea.schmidt',
    avatar: require('./assets/avatars/andrea.schmidt.png'),
  },
];

export default class App extends React.Component {
  state = {
    ready: false,
  };

  async componentDidMount() {
    this.setState({ ready: true });
  }

  render() {
    const { ready } = this.state;
    if (!ready) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        { <Stories {...{ stories }} /> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
  },
});
