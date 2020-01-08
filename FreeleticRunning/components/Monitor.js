import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { Svg, Path} from 'react-native-svg'; 
import * as path  from 'svg-path-properties';

import SVGPath from 'art/modes/svg/path';
const padding = 10;
const radius = 100;

const d = SVGPath()
    .moveTo(padding, radius + padding)
    .arcTo(radius * 2, radius+ padding, radius)
    .toSVG(); 

const formatDuration = (duration) => {
    return moment.utc(moment.duration(duration, 's').asMilliseconds()).format('mm:ss');
  }

export default class Monitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        duration: 0
    };
  }

  componentDidMount() {
      this.interval = setInterval(() => {
          this.setState({duration: this.state.duration + 1});
      }, 1000)
  }

  componentWillUnmount() {
      clearInterval(this.interval);
  }

  
  render() {
    const { distance, pace, totalDistance} =this.props
    const { duration } = this.state;
    const properties = path.svgPathProperties(d);
    const length = properties.getTotalLength();
    const ratio = distance / totalDistance;
    return (
      <SafeAreaView style={styles.container}>
        <View>
            <Svg style={styles.progress}>
                <Path {...{ d }} strokeWidth={padding * 2} fill="transparent" stroke="white" />
                <Path
                    fill="transparent"
                    {...{ d }}
                    stroke="#f2b659"
                    strokeWidth={padding * 2}
                    strokeDasharray={length}
                    strokeDashoffset={length - (ratio * length)}
                />
            </Svg>
            <View style={styles.progressLabel}>
                <Text style={{fontSize: 72, color: 'white'}}>{distance}</Text>
            </View>
        </View>
        <View style={styles.rows}>
            <View style={styles.row}>
                <Icon name="watch" color="white" size={28} />
                <Text style={styles.label}>{formatDuration(pace)}</Text>
            </View>
            <View style={styles.row}>
            <Icon name="clock"  color="white" size={28} />
                <Text style={styles.label}>{formatDuration(duration)}</Text>
            </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#29252b',
        alignItems: 'center'
    },
    progress: {
        width: radius * 2 + padding * 2,
        height: radius * 2 + padding * 2,
    },  
    progressLabel: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 64
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    label: {
        fontSize: 30,
        color: 'white'
    }
})