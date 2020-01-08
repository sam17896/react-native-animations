import React, { Component } from 'react'
import { Text, View, StyleSheet, Animated } from 'react-native'

const {
    Value,
    loop,
    sequence,
    multiply,
    timing
} = Animated;

export class Pin extends Component {
    state = {
        animation: new Value(0)
    }

    componentDidMount() {
        const { animation } = this.state;
        loop(
            sequence([
                timing(animation, {
                    toValue: 1,
                    duration: 1000,
                }),
                timing(animation, {
                    toValue: 0,
                    duration: 1000
                })
            ]),
            {
                useNativeDriver: true
            }
        ).start()
    }

    render() {
        const {animation} = this.state;
        const scale = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.5]
        });
        const outerScale =  animation.interpolate({
            inputRange: [0, 1],
            outputRange: [40, 80]
        })
        return (
            <Animated.View style={[styles.outerPin, { width: outerScale, height: outerScale, borderRadius: multiply(outerScale, 2) }]}>
                <View style={styles.pin}>
                    <Animated.View style={[styles.innerPin, { transform: [{ scale }] }]} />
                </View>
            </Animated.View>
        )
    }
}


const styles = StyleSheet.create({
    outerPin: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(242, 182, 89, 0.25)'
    },
    pin: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',

    },
    innerPin: {
        width: 10,
        height: 10,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#f2b659',
        alignItems: 'center',
    }
});

export default Pin

