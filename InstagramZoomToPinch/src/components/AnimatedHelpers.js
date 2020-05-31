import Animated from 'react-native-reanimated';

const {Value, block} = Animated;

const create = (x, y) => ({
  x: new Value(x),
  y: new Value(y),
});

const add = (a, b) => ({
  x: Animated.add(a.x, b.x),
  y: Animated.add(a.y, b.y),
});

const sub = (a, b) => ({
  x: Animated.sub(a.x, b.x),
  y: Animated.sub(a.y, b.y),
});

const multiply = (a, b) => ({
  x: Animated.multiply(a.x, b.x),
  y: Animated.multiply(a.y, b.y),
});

const divide = (a, b) => ({
  x: Animated.divide(a.x, b.x),
  y: Animated.divide(a.y, b.y),
});

const set = (a, b) => block([Animated.set(a.x, b.x), Animated.set(a.y, b.y)]);

const invert = a => multiply({x: -1, y: -1}, a);

export const Vector = {
  invert,
  create,
  add,
  sub,
  multiply,
  divide,
  set,
};
