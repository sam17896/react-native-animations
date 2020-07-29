import Animated, {
  concat,
  cond,
  divide,
  eq,
  floor,
  lessThan,
  modulo,
  multiply,
  sub,
} from 'react-native-reanimated';

const formatInt = (value) => {
  const t = floor(divide(value, 1000));
  return cond(lessThan(t, 1), concat(t), concat(t, ',', modulo(value, 1000)));
};

export const format = (value) => {
  const int = floor(value);
  const dec = floor(multiply(sub(value, int), 100));
  const formattedDec = cond(
    eq(dec, 0),
    '00',
    cond(lessThan(dec, 10), concat('0', dec), concat(dec)),
  );
  return concat('$', formatInt(int), '.', formattedDec);
};
