import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const PADDING = 4;
export const FONT_SIZE = 92;
export const EMOJI_WIDTH = FONT_SIZE + PADDING * 2;
export const EMOJIS_OFFSET = (width - EMOJI_WIDTH) / 2;



