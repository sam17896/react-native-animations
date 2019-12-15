// @flow
import * as React from "react";
import {
  View, StyleSheet, Image, Dimensions,
  TouchableWithoutFeedback
} from "react-native";


const width = Dimensions.get("window").width / 2 - 16 * 2;
const height = width * 1.77;

export default class StoryThumbnail extends React.PureComponent {

  thumbnail = React.createRef();


  measure =  () => new Promise(
    resolve => this.thumbnail.current.measureInWindow(
      (x, y, width, height) => resolve({x, y, width, height}) )
  )

  render() {
    const { story, onPress, selected} = this.props;
    if(selected) {
      return (<View style={styles.image}/>)
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
          <Image ref={this.thumbnail} source={story.source} style={styles.image} />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width,
    height,
    marginTop: 16,
    borderRadius: 5
  },
});
