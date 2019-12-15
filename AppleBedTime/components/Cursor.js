import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native'

import Animated from 'react-native-reanimated';
import { atan2 } from './Math';
 
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const {  Value, event, block, cond, eq, set, add, sub, multiply, sin, cos, debug, } = Animated;

export default ({radius, angle}) => {
    const α = new Value(0);
    const translationX = new Value(0);
    const translationY = new Value(0);
    const offsetX = new Value(0);
    const offsetY = new Value(0);
    const x = new Value(0);
    const y = new Value(0);
    const state = new Value(State.UNDETERMINED);

    const translateX = x;
    const translateY = y;

    const onGestureEvent = event([
        {
            nativeEvent: {
                translationX,
                translationY,
                state
            }
        }
    ]);
    return (
        <>
            <Animated.Code>
            {
                () => block([
                    cond(eq(state, State.ACTIVE), [
                        set(x, add(offsetX, translationX)),
                        set(y, add(offsetY, translationY)),
                    ]),
                    cond(eq(state, State.END), [
                        set(offsetX, x),
                        set(offsetY, y)
                    ]),
                    set(α, atan2(add(multiply(y, -1), radius), sub(x, radius))),
                    set(angle, α),
                    set(translateX, add(multiply(radius, cos(α)), radius)),
                    set(translateY, add(multiply(-1 * radius, sin(α)), radius)),
                ])
            }
            </Animated.Code>
            <PanGestureHandler
                onHandlerStateChange={onGestureEvent}
                onGestureEvent={onGestureEvent}
            >
                <Animated.View style={[
                    styles.container,
                    {
                        transform: [
                            { translateY },
                            { translateX }
                        ]
                    }
                ]}>

                </Animated.View>
            </PanGestureHandler>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white'
    }
})