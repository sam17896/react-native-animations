// @flow
import * as React from "react";
import {
  View, StyleSheet, ScrollView, SafeAreaView,
} from "react-native";

import StoryThumbnail from "./StoryThumbnail";
import StoryModal from './StoryModal'

export default class Discovery extends React.PureComponent {
  state = {
    selectedStory: null,
    position: null
  }

  constructor(props) {
    super(props);

    this.thumbnails = props.stories.map(() => React.createRef());
  }

  selectStory = async (selectedStory, index) => {
    const position =  await this.thumbnails[index].current.measure();
    console.log({ position });
    this.setState({ selectedStory, position })
  }

  onRequestClose = () => {
    this.setState({selectedStory: null, position: -1 })
  }

  render() {
    const { stories } = this.props;
    const { selectedStory, position } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={styles.content}
            contentInsetAdjustmentBehavior="automatic"
          >
            {stories.map((story, index) => <StoryThumbnail 
              ref={this.thumbnails[index]}
              onPress={() => this.selectStory(story, index)}
              selected={
                !!selectedStory && selectedStory.id == story.id
              }
              key={story.id} {...{ story }} />)}
          </View>
        </ScrollView>
        { selectedStory && (
          <StoryModal story={selectedStory} onRequestClose={this.onRequestClose} position={position} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 64,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
