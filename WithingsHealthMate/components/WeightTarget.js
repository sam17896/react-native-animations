import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, TextInput, InteractionManager } from 'react-native';
import Graph, { ROW_HEIGHT } from './Graph';
import * as _ from 'lodash';
const PADDING = 50;

import {
    scaleLinear
} from 'd3-scale';

const { height } = Dimensions.get('window');

const WeightTarget = (props) => {
    const scroll = React.createRef();
    const relativeInput = React.createRef();
    const absoluteValue = React.createRef();
    const { weight, height: h } = props;
    const BMI = _.round(weight / (h * h));

    const from = BMI - 10;
    const to = BMI + 10;

    const scaleBMI = scaleLinear().domain([to, from]).range([0, 21 * ROW_HEIGHT - height]);
    const [state, setState] = useState({
        y: new Animated.Value(scaleBMI.invert(BMI)),
        initialized: false
    })

    useEffect(() => {
        const listener = state.y.addListener(update);
        return () => {
            state.y.removeListener(listener);
        }
    }, [])

    useLayoutEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            const y = scaleBMI.invert(BMI);
            scroll.current.getNode().scrollTo({ y, animated: false });
            update({ value: y }, true)
        })
        return () => {

        };
    }, [])



    const update = ({ value }, init) => {
        const { height: h, weight } = props;
        const BMI = scaleBMI.invert(value);
        const kg = BMI * h * h;
        absoluteValue.current.setNativeProps({
            text: `${(_.round(kg * 2) / 2).toFixed(1)}`,
        });
        relativeInput.current.setNativeProps({
            text: `${(_.round((kg - weight) * 2) / 2).toFixed(1)}`,
        });

    }


    const inputRange = [0, (to - from + 1) * ROW_HEIGHT - height];
    const translateY = state.y.interpolate({
        inputRange,
        outputRange: [-height / 2 + PADDING, height / 2 - PADDING]
    });
    const translateY2 = state.y.interpolate({
        inputRange,
        outputRange: [height / 2 - PADDING, -height / 2 + PADDING]
    });

    const scale = state.y.interpolate({
        inputRange: [inputRange[0], inputRange[1] / 2, inputRange[1]],
        outputRange: [1, 0.5, 1]
    });

    const scaleY = state.y.interpolate({
        inputRange: [inputRange[0], inputRange[1] / 2, inputRange[1]],
        outputRange: [height - PADDING + 2, 25, height - PADDING + 2]
    });

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                ref={scroll}
                style={StyleSheet.absoluteFill}
                showsVerticleScrollIndicator={false}
                scrollEventThrottle={16}
                bounces={false}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: { y: state.y },
                            },
                        },
                    ],
                    { useNativeDriver: true },
                )}
            >
                <Graph from={BMI - 10} to={BMI + 10} />
            </Animated.ScrollView>

            <View style={styles.overlay} pointerEvents="none">
                <Animated.View style={[styles.line, { transform: [{ scaleY }] }]} />
            </View>


            <View style={styles.overlay} pointerEvents="none">
                <Animated.View style={[styles.relativeCircle, { transform: [{ scale }] }]} >
                    <TextInput ref={relativeInput} style={styles.relativeValue} />
                </Animated.View>
            </View>

            <View style={styles.overlay} pointerEvents="none">
                <Animated.View style={[styles.oppositeCircle, { transform: [{ translateY: translateY2 }] }]} />
            </View>
            <View style={styles.overlay} pointerEvents="none">
                <Animated.View style={[styles.absoluteCircle, { transform: [{ translateY }] }]}>
                    <TextInput ref={absoluteValue} style={styles.absoluteValue} />
                </Animated.View>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    },
    absoluteCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    relativeCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        backgroundColor: '#69d0fb',
    },
    oppositeCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white'
    },
    line: {
        backgroundColor: 'white',
        height: 1,
        width: 1
    },
    absoluteValue: {
        color: '#69d0fb',
        fontSize: 24
    },
    relativeValue: {
        color: 'white',
        fontSize: 24
    }
})

export default WeightTarget;