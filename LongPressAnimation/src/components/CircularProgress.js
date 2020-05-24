import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    lessThan,
    multiply,
} from "react-native-reanimated";

import { transformOrigin } from "react-native-redash";
import HalfCircle from "./HalfCircle";
import { PI, RADIUS as DefaultRadius } from "./Constants";

export default ({ progress, bg, fg, radius: RADIUS = DefaultRadius }) => {
    const theta = multiply(progress, 2 * PI);
    const opacity = lessThan(theta, PI);
    const rotate = interpolate(theta, {
        inputRange: [PI, 2 * PI],
        outputRange: [0, PI],
        extrapolate: Extrapolate.CLAMP,
    });
    return (
        <>
            <View style={{ zIndex: 1 }}>
                <HalfCircle color={fg} radius={RADIUS} />
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        transform: transformOrigin(
                            { x: 0, y: RADIUS / 2 },
                            { rotate: theta }
                        ),
                        opacity,
                    }}
                >
                    <HalfCircle color={bg} radius={RADIUS} />
                </Animated.View>
            </View>
            <View style={{ transform: [{ rotate: "180deg" }] }}>
                <HalfCircle color={fg} radius={RADIUS} />
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        transform: transformOrigin({ x: 0, y: RADIUS / 2 }, { rotate }),
                    }}
                >
                    <HalfCircle color={bg} radius={RADIUS} />
                </Animated.View>
            </View>
        </>
    );
};