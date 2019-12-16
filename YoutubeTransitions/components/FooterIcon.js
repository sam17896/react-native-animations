// @flow
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';



export default class FooterIcon extends React.PureComponent {
  render() {
    const { name, label } = this.props;
    return (
      <View style={styles.container}>
        <FeatherIcon style={styles.icon} {...{ name }} />
        <Text style={styles.label}>{label.toUpperCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: 'gray',
  },
  label: {
    color: 'gray',
    marginTop: 8,
    fontSize: 8,
    fontWeight: '500',
  },
});
