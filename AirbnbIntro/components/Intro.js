import React, { PureComponent } from 'react';
import { View, Text, StyleSheet,
    SafeAreaView,
    Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import SVGPath from 'art/modes/svg/path';
import StyleGuide from './StyleGuide';
const {
    width: wWidth,
    height: wHeight
} = Dimensions.get('window');
const {
    Value
} = Animated;
const width = wWidth * 3;
const height = wHeight * 3
const radius = 75;
const xc = width / 2;
const yc = height / 2;

const overlay = SVGPath()
    .moveTo(0,0)
    .lineTo(width, 0)
    .lineTo(width, height)
    .lineTo(0, height)
    .lineTo(0, 0)
    .close()
    .moveTo(xc - radius, yc)
    .counterArcTo(xc, yc + radius, radius)
    .counterArcTo(xc + radius, yc, radius)
    .counterArcTo(xc, yc - radius, radius)
    .counterArcTo(xc - radius, yc, radius)



class Intro extends PureComponent {
  state = {
      index: -1
  }

  x = new Value(0);
  y = new Value(0);

  componentDidMount() {
      this.nextStep();
      
  }

  nextStep = () => {
    const { index } = this.state;
    const { steps } = this.props;
    const step = steps[index];
    if((index + 1) === steps.length) {
        this.setState({index: -1})
    } else {
        this.setState({index: index + 1})
        const { x, y } = steps[index + 1];
        Animated.parallel([
            Animated.timing(this.x, {
                toValue: x,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(this.y, {
                toValue: y,
                duration: 300,
                useNativeDriver: true
            })
        ]).start();
    }

  }

  render() {
    const { steps } = this.props;
    const { index } = this.state;
    const step = steps[index];
    const { x, y } = this;

    const translateY = Animated.add(y, new Animated.Value(-wHeight / 2 + radius));
    const translateX = Animated.add(x, new Animated.Value(-wWidth / 2 + radius));
    
    if(index == -1) {
        return (null);
    }
    
    return (
    <>
      <Animated.View style={[styles.container, {
          transform: [
              { translateX },
              { translateY }
          ]
      }]}>
       <Svg style={StyleSheet.absoluteFill}>
         <Path d={overlay.toSVG()} fill={"#5297a3"} opacity={0.85} />
       </Svg>
      </Animated.View>
      <View style={styles.overlay}>
        <SafeAreaView>
            <Text style={styles.text}>{step.label}</Text>
            <TouchableWithoutFeedback onPress={this.nextStep}>
                <View style={styles.button}>
                    <Text style={styles.text}>Got It</Text>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
      </View>
    </>

    );
  }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: -wHeight,
        left: -wWidth,
        width,
        height
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        padding: StyleGuide.spacing.base
    },
    button: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'white',
        marginTop: StyleGuide.spacing.base,
        padding: StyleGuide.spacing.tiny
    },
    text: {
        color: 'white',
        ...StyleGuide.typography.title2,
        textAlign: 'center'
    }
})



export default Intro;
