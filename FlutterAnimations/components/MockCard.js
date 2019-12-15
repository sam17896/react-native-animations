// @flow
import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';


export default class MockCard extends React.PureComponent {
  render() {
    const { image: source } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.image} {...{ source }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  image: {
    borderRadius: 5,
    height: 200,
    width: null,
    resizeMode: 'cover',
    margin: 8,
  },
});
