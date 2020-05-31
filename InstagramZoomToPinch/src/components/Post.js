import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';

import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  Value,
  useCode,
  block,
  cond,
  eq,
  set,
  or,
} from 'react-native-reanimated';
import {Vector} from './AnimatedHelpers';
import {
  onGestureEvent,
  transformOrigin,
  timing,
  translate,
} from 'react-native-redash';

const {width} = Dimensions.get('window');
const SIZE = width;
const styles = StyleSheet.create({
  image: {
    width: SIZE,
    height: SIZE,
    resizeMode: 'cover',
  },
});

export default ({post, state}) => {
  const scale = new Value(1);
  const focal = Vector.create(0, 0);
  const origin = Vector.create(0, 0);
  const translation = Vector.create(0, 0);
  const gestureHanlder = onGestureEvent({
    state,
    scale,
    focalX: focal.x,
    focalY: focal.y,
  });
  const adjustedFocal = Vector.add({x: -SIZE / 2, y: -SIZE / 2}, focal);
  const zIndex = cond(eq(state, State.ACTIVE), 3, 1);

  useCode(
    () =>
      block([
        cond(eq(state, State.BEGAN), Vector.set(origin, adjustedFocal)),
        cond(
          eq(state, State.ACTIVE),
          Vector.set(
            translation,
            Vector.invert(Vector.sub(origin, adjustedFocal)),
          ),
        ),
        cond(eq(state, State.END), [
          set(translation.x, timing({from: translation.x, to: 0})),
          set(translation.y, timing({from: translation.y, to: 0})),
          set(scale, timing({from: scale, to: 1})),
        ]),
      ]),
    [focal, origin, state],
  );
  return (
    <>
      <PostHeader avatar={post.avatar} username={post.user} />
      <PinchGestureHandler {...gestureHanlder}>
        <Animated.View
          style={{
            width: SIZE,
            height: SIZE,
            zIndex,
          }}>
          <Animated.Image
            style={[
              styles.image,
              {
                transform: [
                  ...translate(translation),
                  ...transformOrigin(origin, {scale}),
                ],
              },
            ]}
            source={{uri: post.picture.uri}}
          />
        </Animated.View>
      </PinchGestureHandler>
      <PostFooter likes={post.likes} caption={post.caption} />
    </>
  );
};
