import React from 'react';
import {View} from 'react-native';
import Svg from 'react-native-svg';
import Candle from './Candle';
import {scaleLinear} from 'd3-scale';
const Chart = ({candles, caliber, size, domain}) => {
  const scaleY = scaleLinear().domain(domain).range([size, 0]);
  const scaleBody = scaleLinear()
    .domain([0, domain[1] - domain[0]])
    .range([0, size]);
  return (
    <Svg width={size} height={size}>
      {candles.map((candle, index) => (
        <Candle
          key={`${index}`}
          {...{candle, caliber, scaleY, scaleBody, index}}
        />
      ))}
    </Svg>
  );
};

export default Chart;
