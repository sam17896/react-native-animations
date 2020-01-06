import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Svg, Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
const width = 125;
const height = 125;
const radius = width / 2;
const padding = 30;
import SVGPath from 'art/modes/svg/path';
import { interpolatePath } from 'd3-interpolate-path';
import * as path  from 'svg-path-properties';
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomRadius = () => getRandomInt(radius - 5, radius);
const generatePath = () => {
  const r = randomRadius();
  return SVGPath()
    .moveTo(padding, r + padding)
    .arc(randomRadius(), -randomRadius(), randomRadius())
    .arc(randomRadius(), randomRadius(), randomRadius())
    .arc(-randomRadius(), randomRadius(), randomRadius())
    .arcTo(padding, r + padding, r)
    .toSVG();
};

const p1 = generatePath();
const paths = [
  p1,
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  generatePath(),
  p1,
];


export default class Progress extends Component {
   
    interpolator = interpolatePath(paths[0], paths[1]);
    lastIndex = 1;
    progress = 0;

    state = {
        d: paths[0]
    }

    animate = () => {
        requestAnimationFrame(() => {
          this.progress += 0.1;
          if (this.progress >= 1) {
            this.progress = 0;
            if (this.lastIndex === (paths.length - 1)) {
              this.lastIndex = 0;
            }
            // FIXME: the first and the last paths shouldn't require to be identical
            this.interpolator = interpolatePath(paths[this.lastIndex], paths[this.lastIndex + 1]);
            this.lastIndex += 1;
          }
          const d = this.interpolator(this.progress);
          this.setState({ d });
        });
      }
    componentDidMount () {
        this.interval = setInterval(this.animate, 100)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        const { progress } = this.props;
        const { d } = this.state;
        const properties = path.svgPathProperties(d);
        const length = properties.getTotalLength();
        const ratio = length * progress;
        return (
        <View style={styles.container}>
            <Svg {...{ width: width + padding * 2, height: height + padding * 2, transform: [{ rotate: 90 }] }}>
            <Path
            {...{ d }}
            stroke="rgba(113, 117, 142, 0.25)"
            strokeWidth={padding}
          />
          <Path
            fill="#71758e"
            {...{ d }}
            stroke="rgba(113, 117, 142, 0.5)"
            strokeWidth={padding}
            strokeDasharray={length}
            strokeDashoffset={length + 1 - ratio}
          />
            </Svg>
            <View style={styles.buttonContainer}>
            <Icon name="pause" color="#fbe3b9" size={54} />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width + padding * 2,
        height: height + padding * 2,
      },
    buttonContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    }
})