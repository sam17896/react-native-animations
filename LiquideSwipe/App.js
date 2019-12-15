import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { StyleGuide } from "./src/components";
import Episodes from "./src/Episodes";
import Things from "./src/Things";
import LiquidSwipe from "./src/LiquidSwipe";


const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      LiquidSwipe: {
        screen: LiquidSwipe,
        navigationOptions: {
          header: null,
          title: "Liquid Swipe",
          gesturesEnabled: false
        }
      },
      Episodes: {
        screen: Episodes,
        navigationOptions: {
          title: "Can it be done in React Native?",
          headerBackTitle: null
        }
      },
      Things: {
        screen: Things,
        navigationOptions: { title: "Things" }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: StyleGuide.palette.primary,
          borderBottomWidth: 0
        },
        headerTintColor: "white"
      }
    }
  )
);

export default () => (
  <>
    <StatusBar barStyle="light-content" />
    <AppNavigator />
  </>
);
