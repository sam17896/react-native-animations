import * as React from 'react';
import { TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
const {Value, call} = Animated;
const emojis = require("../assets/emoji-db.json");
const emojiList = Object.keys(emojis);


export default class Translation extends React.PureComponent {

  text = React.createRef();

  setTranslation = ([index]) => requestAnimationFrame(() => {
    const {lang} = this.props;
    const text = emojis[emojiList[index]][lang]
    this.text.current.setNativeProps({ text });
  })

  render() {
    const {index, style} = this.props;
    return (
      <>
        <Animated.Code>
          {
            () => call([index], this.setTranslation)
          }
        </Animated.Code>
        <TextInput
          ref={this.text}
          underlineColorAndroid="transparent"
          editable={false}
          {...{ style }}
        />
      </>
    );
  }
}