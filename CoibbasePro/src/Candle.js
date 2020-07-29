import React from 'react';
import {View} from 'react-native';
import {Line, Rect} from 'react-native-svg';
const MARGIN = 4;
const Candle = ({
  candle: {low, high, open, close},
  caliber,
  scaleY,
  scaleBody,
  index,
}) => {
  const x = caliber * index + 0.5 * caliber;
  const color = open > close ? '#4AFA9A' : '#E33F64';
  return (
    <>
      <Line
        x1={x}
        x2={x}
        y1={scaleY(high)}
        y2={scaleY(low)}
        stroke={color}
        strokeWidth={1}
      />
      <Rect
        x={caliber * index + MARGIN}
        y={scaleY(Math.max(open, close))}
        width={caliber - MARGIN}
        fill={color}
        height={scaleBody(Math.max(open, close) - Math.min(open, close))}
      />
    </>
  );
};

export default Candle;
