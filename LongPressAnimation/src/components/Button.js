import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CircularProgress from './CircularProgress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { mix } from 'react-native-redash';
import Animated, { useCode, cond, call, eq } from 'react-native-reanimated';

const SIZE = 150;
const STROKE_WIDTH = 10;
const ICON_SIZE = 96;
const CONTENT_SIZE = SIZE - STROKE_WIDTH * 2

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: STROKE_WIDTH,
        bottom: STROKE_WIDTH,
        left: STROKE_WIDTH,
        right: STROKE_WIDTH,
        backgroundColor: 'white',
        borderRadius: (CONTENT_SIZE) / 2,
        zIndex: 100,
    },
    icon: {
        top: (CONTENT_SIZE - ICON_SIZE) / 2,
        left: (CONTENT_SIZE - ICON_SIZE) / 2
    },
    activeIcon: {
        position: "absolute",
        top: (CONTENT_SIZE - ICON_SIZE) / 2,
        left: (CONTENT_SIZE - ICON_SIZE) / 2
    }
})

export default ({ progress }) => {
    const [active, setActive] = useState(false);
    const height = mix(progress, 0, ICON_SIZE)

    useCode(() => cond(
        eq(progress, 1),
        call([], () => setActive(true)),
        call([], () => setActive(false))),
        [progress]
    )
    return (
        <View>
            <CircularProgress
                radius={SIZE / 2}
                bg={'white'}
                fg={'blue'}
                {...{ progress }}
            />
            <View style={styles.container}>
                <Icon
                    name={active ? "check-circle" : "fingerprint"}
                    size={ICON_SIZE}
                    style={styles.icon}
                    color={active ? 'blue' : 'grey'}
                />
                <Animated.View
                    style={[styles.activeIcon, { height, opacity: active ? 0 : 1 }]}
                >
                    <Icon
                        name={active ? "check-circle" : "fingerprint"}
                        size={ICON_SIZE}
                        color={'blue'}
                    />
                </Animated.View>
            </View>
        </View>
    )
}