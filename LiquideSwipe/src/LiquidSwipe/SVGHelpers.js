import Animated from "react-native-reanimated";
import { string } from "react-native-redash";

export const moveTo = (
  commands,
  x,
  y
) => {
  commands.push(string`M${x},${y} `);
};

export const lineTo = (
  commands,
  x,
  y
) => {
  commands.push(string`L${x},${y} `);
};


export const curveTo = (commands, c) => {
  commands.push(
    string`C${c.c1.x},${c.c1.y} ${c.c2.x},${c.c2.y} ${c.to.x},${c.to.y} `
  );
};

export const close = (commands) => {
  commands.push(string`Z`);
};
