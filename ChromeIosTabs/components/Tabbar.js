// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import Icon from 'react-native-vector-icons/Feather';


export const TABBAR_HEIGHT = 45;
export const TAB_WIDTH = 75;
export const TABBAR_WIDTH = TAB_WIDTH * 3;

export default class TabBar extends React.Component {

    render() {
        const {color, borderColor, backgroundColor} = this.props;
        const tabStyle = {
          backgroundColor,
          borderColor
        };
        return (
          <View style={styles.tabs}>
            <View style={[styles.tab, styles.firstTab, tabStyle]}>
              <Icon name="eye-off" size={35} {...{color}} />
            </View>
            <View style={[styles.tab, tabStyle]}>
              <Icon name="grid" size={35} {...{color}} />
            </View>
            <View style={[styles.tab, styles.lastTab, tabStyle]}>
              <Icon name="chrome" size={35} {...{color}} />
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    height: TABBAR_HEIGHT
  },
  tab: {
    width: TAB_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  firstTab: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1
  },
  lastTab: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 1
  },
});
