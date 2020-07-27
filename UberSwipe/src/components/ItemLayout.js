import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const currency = new Intl.NumberFormat('ch', {
  style: 'currency',
  currency: 'CHF',
});

export const HEIGHT = 64;
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    height: HEIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e2e3e4',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    backgroundColor: '#e2e3e4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    //   fontFamily: "UberMoveMedium",
    fontSize: 16,
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    marginRight: 8,
  },
});

const ItemLayout = ({item: {price, quantity, title}}) => {
  return (
    <View style={styles.content}>
      <View style={styles.info}>
        <View style={styles.quantity}>
          <Text>{quantity}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.price}>{currency.format(price)}</Text>
    </View>
  );
};

export default ItemLayout;
