import {Dimensions} from 'react-native';
import {interpolate, Extrapolate} from 'react-native-reanimated';

export const round = (value, precision = 0) => {
  'worklet';
  const p = Math.pow(10, precision);
  return Math.round(value * p) / p;
};
import data from './data.json';

export const CANDLES = data.slice(0, 20);

export const {width: SIZE} = Dimensions.get('window');
export const STEP = SIZE / CANDLES.length;

export const formatUSD = (value) => {
  'worklet';
  return `$ ${round(value, 2).toLocaleString('en-US', {currency: 'USD'})}`;
};

export const formatDatetime = (value) => {
  'worklet';
  const d = new Date(value);
  return d.toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getDomain = (rows) => {
  'worklet';
  const values = rows.map(({high, low}) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
};

export const DOMAIN = getDomain(CANDLES);

export const scaleY = (value) => {
  'worklet';
  return interpolate(value, DOMAIN, [SIZE, 0], Extrapolate.CLAMP);
};

export const scaleBody = (value) => {
  'worklet';
  return interpolate(
    value,
    [0, Math.max(...DOMAIN) - Math.min(...DOMAIN)],
    [0, SIZE],
    Extrapolate.CLAMP,
  );
};

export const scaleYInvert = (y) => {
  'worklet';
  return interpolate(y, [0, SIZE], DOMAIN.reverse(), Extrapolate.CLAMP);
};
