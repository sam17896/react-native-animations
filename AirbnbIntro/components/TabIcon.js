import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import StyleGuide from "./StyleGuide";

export default class TabIcon extends React.PureComponent {
  static defaultProps = {
    active: false,
  };

  render() {
    const { label, icon, active } = this.props;
    const color = active ? "#f7555c" : "black";
    return (
      <View style={styles.container}>
        <Icon name={icon} {...{ color }} size={25} />
        <Text style={[styles.label, { color }]}>{label.toUpperCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    ...StyleGuide.typography.micro,
    marginTop: StyleGuide.spacing.tiny,
  },
});
