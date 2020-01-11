import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Animated} from 'react-native'
import {Svg, Rect, Defs, ClipPath} from 'react-native-svg'

const barWidth = 4;
const barMargin =1;

const {width: wWidth} = Dimensions.get('window');
const offset = wWidth / 2;
const AnimatedRect = Animated.createAnimatedComponent(Rect);

const {
 
} =Animated;

export default class Waveform extends Component {
    render() {
        const {waveform, color, progress} = this.props;
        const width = waveform.width * (barWidth + barMargin) + offset;
        const height = waveform.height + barMargin + (waveform.height * 0.61);
        const x = progress ? progress.interpolate({
            inputRange: [0, width - wWidth - offset ,width - wWidth],
            outputRange: [-width + offset, -wWidth, 0],
        }) : 0;
        return (
            <Svg {...{width, height}}>
                <Defs>
                    <ClipPath id="progress">
                        <AnimatedRect {...{width, height, x}} />
                    </ClipPath>
                </Defs>
                {
                    waveform.samples.map((sample, key) => {
                        return (
                            <React.Fragment {...{ key }}>
                                <Rect 
                                    clipPath={"url#progress"}
                                    y={waveform.height - sample} 
                                    x={key*(barWidth + barMargin) + offset}  
                                    width={barWidth} 
                                    fill={color} 
                                    height={sample}/>
                                <Rect 
                                    clipPath={"url#progress"}
                                    y={waveform.height  + barMargin} 
                                    x={key*(barWidth + barMargin) + offset} 
                                    width={barWidth} 
                                    fill={color} 
                                    opacity={0.5}
                                    height={sample} />
                            </React.Fragment>
                        )
                    })
                }
            </Svg>
        )
    }
}


const styles = StyleSheet.create({

})