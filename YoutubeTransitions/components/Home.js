// @flow
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import VideoThumbnail from './VideoThumbnail';
import videos from './videos';

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends React.PureComponent {
  render() {
    return (
      <ScrollView style={styles.container}>
        {
          videos.map(video => (
            <VideoThumbnail key={video.id} {...{ video }} />
          ))
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
  },
});
