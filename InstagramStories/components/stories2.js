import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import Story from './story';
const {
    width,
    height
} = Dimensions.get('window');
import Animated from 'react-native-reanimated';
const perspective = 350;
const A = Math.atan(perspective / width / 2);

const {
    concat
} = Animated;

export class Stories2 extends Component {
    state = {
        x: new Animated.Value(0)
    }

    getStyle = (index) => {
        const { x } = this.state;
        const offset = width * index;
        const inputRange = [offset - width, offset + width];
        const translateX = x.interpolate({
            inputRange,
            outputRange: [width / 2, -width / 2],
            extrapolate: "clamp"
        });

        const rotateY = x.interpolate({
            inputRange,
            outputRange: [A, -A],
            extrapolate: 'clamp'
        });

        const translateX1 = x.interpolate({
            inputRange,
            outputRange: [width / 2, -width / 2],
            extrapolate: "clamp"
        });

        return {
            ...StyleSheet.absoluteFillObject,
            transform: [
                { perspective },
                { translateX },
                { rotateY: concat(rotateY, 'rad') },
                { translateX: translateX1 }
            ]
        }


    }
    render() {
        const { stories } = this.props;
        const { x } = this.state;
        return (
            <View style={styles.container}>
                {
                    stories.map((story, index) => {
                        return (
                            <Animated.View key={story.id} style={this.getStyle(index)}>
                                <Story {...{ story }} />
                            </Animated.View>)
                    })
                }
                <Animated.ScrollView
                    style={StyleSheet.absoluteFillObject}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    snapToInterval={width}
                    contentContainerStyle={{ width: width * stories.length }}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: { x },
                                },
                            },
                        ],
                        { useNativeDriver: true },
                    )}
                    decelerationRate={0.99}
                    horizontal
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
})

export default Stories2
