import React, { Component } from 'react';
import { View , StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State }  from 'react-native-gesture-handler';
import { onGestureEvent, preserveOffset, runSpring, snapPoint } from 'react-native-redash';

const {
    Clock,
    Value,
    diff,
    eq,
    divide,
    modulo,
    block,
    sub,
    cond,
    set,
    useCode,
    startClock,
    stopClock,
    clockRunning,
    ceil,
    not,
    floor
} = Animated;

export default ({ index, ratio, length }) => {
    const clock = new Clock();
    const shouldSnap = new Value(0);
    const state  = new Value(State.UNDETERMINED);
    const translationX = new Value(0);
    const velocityX = new Value(0);
    const gestureHandler = onGestureEvent({
        state,
        translationX,
        velocityX
    })
    const translateX = preserveOffset(translationX, state);
    const increament = divide(diff(translationX), ratio);
    const setIndex = value => set(index, modulo(value, length));
    useCode(block([
        setIndex(sub(index, increament)),
        cond(eq(state, State.BEGAN), stopClock(clock)),
        cond(eq(state, State.END), [
            set(state, State.UNDETERMINED),
            set(shouldSnap, 1)
        ]),
        cond(eq(shouldSnap, 1), [
            setIndex(
                runSpring(clock, index, snapPoint(index, divide(velocityX, -ratio), [ceil(index), floor(index)] ))
            )
        ]),
        cond(not(clockRunning(clock),  set(shouldSnap, 0)))

    ]), [])
    return (
        <PanGestureHandler {...gestureHandler}>
            <Animated.View style={StyleSheet.absoluteFill}></Animated.View>
        </PanGestureHandler>
    )
}