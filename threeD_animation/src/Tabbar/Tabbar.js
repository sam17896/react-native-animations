import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Tab from "./Tab";
import Compass from "./icons/Compass";
import Chat from "./icons/Chat";
import Camera from "./icons/Camera";
import Bell from "./icons/Bell";
import { ICON_SIZE, PADDING, SEGMENT } from "./icons/Constants";

const tabs = [
  { icon: <Compass /> },
  { icon: <Chat /> },
  { icon: <Camera /> },
  { icon: <Bell /> }
];
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  tabs: {
    flexDirection: "row",
    alignItems: "center"
  },
  tab: {
    width: SEGMENT,
    height: ICON_SIZE + PADDING * 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default () => {
  const [active, setActive] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map(({ icon }, index) => (
          <View key={index} style={styles.tab}>
            <Tab onPress={() => setActive(index)} {...{ active, index }}>
              {icon}
            </Tab>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};
