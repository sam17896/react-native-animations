import React from "react";
import { StatusBar } from "react-native";

import Album from "./components/Album";
import BottomTab from "./components/BottomTab";

const assets = [
  require("./assets/Jan-Blomqvist.jpg"),
  require("./assets/thebay.jpg")
];

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Album />
      <BottomTab />
    </>
  );
}
