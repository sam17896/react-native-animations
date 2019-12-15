// @flow
import * as React from "react";
import {
  View, StyleSheet, Text, Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import StyleGuide from "./StyleGuide";

export default class HomeCard extends React.PureComponent {
  render() {
    const { home } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: home.picture }} style={styles.image} />
          <Icon name="heart" color="white" size={16} />
        </View>
        <Text style={styles.micro}>
          {`${home.category1.toUpperCase()} - ${home.category2.toUpperCase()}`}
        </Text>
        <Text style={styles.large}>{home.title}</Text>
        <Text style={styles.small}>
          {`${home.price.amount} ${home.price.currency} per person`}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 158,
    marginRight: StyleGuide.spacing.small,
  },
  imageContainer: {
    width: 158,
    height: 103,
    borderRadius: 2,
    marginBottom: StyleGuide.spacing.small,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: StyleGuide.spacing.tiny,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  large: {
    marginBottom: StyleGuide.spacing.small,
    ...StyleGuide.typography.large,
  },
  small: {
    marginBottom: StyleGuide.spacing.small,
    ...StyleGuide.typography.small,
  },
  micro: {
    marginBottom: StyleGuide.spacing.small,
    ...StyleGuide.typography.micro,
  },
});
