import React from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet, Animated } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import * as shape from 'd3-shape';

const { width } = Dimensions.get('window');
import StaticTabbar, { tabHeight as height } from './StaticTabbar';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const tabs = [
    {name: 'grid'},
    {name: 'list'},
    {name: 'refresh-cw'},
    {name: 'box'},
    {name: 'user'}
]

const tabWidth = width / tabs.length;

const left = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    ([
        {x: 0, y: 0},
        {x: width, y: 0}
    ]);

const right = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    ([
        {x: width + tabWidth, y: 0},
        {x: width * 2, y: 0},
        {x: width * 2, y: height},
        {x: 0, y: height},
        {x: 0, y: 0}
    ]);

const tab = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)
    ([
        {x: width, y: 0},
        {x: width + 5, y: 0},
        {x: width + 10, y: 10},
        {x: width + 15, y: height},
        {x: width + tabWidth - 15, y: height},
        {x: width + tabWidth - 10, y: 10},
        {x: width + tabWidth - 5, y: 0},
        {x: width + tabWidth, y: 0}

    ])


const d = `${left} ${tab} ${right}`;

const Tabbar = () => {


    value = new Animated.Value(-width);

    return (
        <>
            <View style={{height, width}}>
                <AnimatedSvg width={width * 2} style={{transform: [{translateX: value}]}} {...{ height }}>
                    <Path {... {d}} fill="white"/>
                </AnimatedSvg>
                <View style={StyleSheet.absoluteFill}>
                    <StaticTabbar tabs={tabs} value={value} />
                </View>
            </View>
            <SafeAreaView style={{
                backgroundColor: 'white',
            }}/>
        </>
    )
}

export default Tabbar;