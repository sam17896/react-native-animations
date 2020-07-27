import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#e2e3e4',
  },
  body: {
    // fontFamily: "UberMoveRegular",
    fontSize: 16,
    lineHeight: 22,
  },
  icon: {
    marginRight: 16,
  },
});

const Row = ({label, icon, first}) => {
  const borderBottomWidth = first ? 0 : StyleSheet.hairlineWidth;
  return (
    <View style={[styles.container, {borderBottomWidth}]}>
      <Icon name={icon} style={styles.icon} size={16} />
      <Text style={styles.body}>{label}</Text>
    </View>
  );
};

export default Row;
