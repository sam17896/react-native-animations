import Animated  from 'react-native-reanimated';
import { runSpring } from 'react-native-redash';
const {
  Value, Clock, cond, eq, stopClock, set, clockRunning,
} = Animated;
const springConfig = () => ({
  toValue: new Value(0),
  damping: 15,
  mass: 1,
  stiffness: 200,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
});

export const createValue = (val) => ({
  value: new Value(val),
  clock: new Clock(),
  hasSprung: new Value(0),
  hasSprungBack: new Value(0),
});

export const springBack = (v, from, to) => [
  cond(eq(v.hasSprung, 0), [
    stopClock(v.clock),
    set(v.hasSprung, 1),
  ]),
  spring(v, from, to, "hasSprungBack"),
];

export const spring = (
  v,
  from,
  to,
  back = "hasSprung",
) => cond(eq(v[back], 0), [
  set(v.value, runSpring(v.clock, from, to, springConfig())),
  cond(eq(clockRunning(v.clock), 0), set(v[back], 1)),
]);
