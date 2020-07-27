import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 8,
    backgroundColor: '#e2e3e4',
    padding: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  text: {
    //   fontFamily: "UberMoveRegular",
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 8,
  },
});

const Option = ({icon, label, selected}) => {
  const backgroundColor = selected ? 'black' : '#e2e3e4';
  const color = selected ? 'white' : 'black';
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Icon name={icon} size={16} {...{color}} />
      <Text style={[styles.text, {color}]}>{label}</Text>
    </View>
  );
};

export default Option;
