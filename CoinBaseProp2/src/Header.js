import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 16,
    color: '#d3d3d3',
  },
  rightColumn: {
    flex: 1,
  },
  leftColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  tabContainer: {
    backgroundColor: '#222324',
    borderRadius: 8,
    flexDirection: 'row',
  },
  tab: {
    padding: 8,
  },
  tabLabel: {
    fontSize: 14,
    fontVariant: ['tabular-nums'],
    color: '#d3d3d3',
  },
  tabLabelActive: {
    fontSize: 14,
    fontVariant: ['tabular-nums'],
    color: 'white',
    fontWeight: '500',
  },
});

const Tabs = ({tabs}) => (
  <View style={styles.tabContainer}>
    {tabs.map((tab, index) => (
      <View style={styles.tab} key={index}>
        <Text style={index === 0 ? styles.tabLabelActive : styles.tabLabel}>
          {tab.toUpperCase()}
        </Text>
      </View>
    ))}
  </View>
);

const Header = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.rightColumn}>
              <Text style={styles.title}>BTC - USD</Text>
              <Text style={styles.subtitle}>2.2k BTC 24hr vol</Text>
            </View>
            <View style={styles.leftColumn}>
              <Text style={styles.title}>$7,543.12</Text>
              <Text style={[styles.subtitle, {color: '#4AFA9A'}]}>+5.11%</Text>
            </View>
          </View>
          <View style={styles.tabs}>
            <Tabs tabs={['Price', 'Depth', 'Book']} />
            <Tabs tabs={['1D']} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;
