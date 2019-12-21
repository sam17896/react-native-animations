/* eslint-disable global-require */
import _ from "lodash";
import React from "react";
import CardSelection from "./components/CardSelection";

const cards = [
  {
    id: "purple-sky",
    name: "Purple Sky",
    design: require("./assets/cards/purple-sky.png"),
    thumbnail: require("./assets/cards/purple-sky-thumbnail.png"),
    color: "#ec10db"
  },
  {
    id: "summer-sunset",
    name: "Summer Sunset",
    design: require("./assets/cards/summer-sunset.png"),
    thumbnail: require("./assets/cards/summer-sunset-thumbnail.png"),
    color: "#a373de"
  },
  {
    id: "meteor-shower",
    name: "Meteor shower",
    design: require("./assets/cards/meteor-shower.png"),
    thumbnail: require("./assets/cards/meteor-shower-thumbnail.png"),
    color: "#fc6091"
  }
];

export default () => {
  return <CardSelection {...{ cards }} />;
};
