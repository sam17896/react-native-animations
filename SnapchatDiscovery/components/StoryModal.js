import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Video from 'react-native-video';
const { width: wWidth, height: wHeight } = Dimensions.get('window');

const {
    Value, Clock, block, and,
    lessOrEq, greaterThan, call,
    interpolate,
    cond, event, clockRunning, spring, startClock,
    stopClock, set, eq } = Animated;
function runSpring(value, dest) {
    const clock = new Clock();
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0),
    };

    const config = {
        damping: 10,
        mass: 1,
        stiffness: 100,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: new Value(0),
    };

    return [
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.velocity, 0),
            set(state.position, value),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        spring(clock, state, config),
        cond(state.finished, stopClock(clock)),
        set(value, state.position),
    ];
}

export default class StoryModal extends Component {

    constructor(props) {
        super(props);
        const { x, y, width, height } = props.position;
        this.translateX = new Value(x);
        this.translateY = new Value(y);
        this.width = new Value(width);
        this.height = new Value(height);
        this.velocityY = new Value(0);
        this.gestureState = new Value(State.UNDETERMINED);
        this.onGestureEvent = event([
            {
                nativeEvent: {
                    translationX: this.translateX,
                    translationY: this.translateY,
                    velocityY: this.velocityY,
                    state: this.gestureState
                }
            }
        ], { useNativeDriver: true })

    }



    render() {
        const { translateY, translateX, width, height } = this;
        const { story, onRequestClose, position } = this.props;
        const style = {
            ...StyleSheet.absoluteFillObject,
            width,
            height,
            transform: [
                { translateX },
                { translateY }
            ]
        }
        return (
            <View style={styles.container}>
                <Animated.Code>
                    {
                        () => block([
                            cond(eq(this.gestureState, State.UNDETERMINED), runSpring(this.translateX, 0)),
                            cond(eq(this.gestureState, State.UNDETERMINED), runSpring(this.translateY, 0)),
                            cond(eq(this.gestureState, State.UNDETERMINED), runSpring(this.width, wWidth)),
                            cond(eq(this.gestureState, State.UNDETERMINED), runSpring(this.height, wHeight)),
                            cond(and(eq(this.gestureState, State.END), lessOrEq(this.velocityY, 0)), block([
                                runSpring(translateX, 0),
                                runSpring(translateY, 0),
                                runSpring(width, wWidth),
                                runSpring(height, wHeight),
                            ])),
                            cond(and(eq(this.gestureState, State.END), greaterThan(this.velocityY, 0)), block([
                                runSpring(translateX, this.props.position.x),
                                runSpring(translateY, this.props.position.y),
                                runSpring(width, this.props.position.width),
                                runSpring(height, this.props.position.height),
                                cond(eq(height, this.props.position.height), call([], onRequestClose))
                            ])),
                            cond(eq(this.gestureState, State.ACTIVE), set(this.height, interpolate(this.translateY, {
                                inputRange: [0, wHeight],
                                outputRange: [wHeight, position.height],
                            }))),
                            cond(eq(this.gestureState, State.ACTIVE), set(this.width, interpolate(this.translateY, {
                                inputRange: [0, wWidth],
                                outputRange: [wWidth, position.width],
                            }))),
                        ])
                    }
                </Animated.Code>
                <PanGestureHandler
                    activeOffsetY={100}
                    onHandlerStateChange={this.onGestureEvent}
                    onGestureEvent={this.onGestureEvent}>
                    <Animated.View {...{ style }}>
                        {
                            !story.video && (
                                <Image source={story.source} style={styles.image} />
                            )
                        }
                        {
                            story.video && (
                                <Video
                                    source={story.video}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="cover"
                                    shouldPlay
                                    isLooping
                                    style={styles.video}
                                />
                            )
                        }
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
        borderRadius: 5
    },
    video: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 5,
      },
})