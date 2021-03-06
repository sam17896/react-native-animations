import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StyleGuide } from "./src/components";
import Episodes, { episodes } from "./src/Episodes";
import Things from "./src/Things";
import Chrome, { assets as chromeAssets } from "./src/Chrome";
import LiquidSwipe, { assets as liquidSwipeAssets } from "./src/LiquidSwipe";
import UberEats, {
  assets as uberEatsAssets,
  fonts as uberEatsFonts
} from "./src/UberEats";

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Episodes: {
        screen: Episodes,
        navigationOptions: {
          title: "Can it be done in React Native?",
          headerBackTitle: null
        }
      },
      UberEats: {
        screen: UberEats,
        navigationOptions: {
          title: "Uber Eats",
          header: () => null
        }
      },
      Chrome: {
        screen: Chrome,
        navigationOptions: { title: "Google Chrome" }
      },
    
      LiquidSwipe: {
        screen: LiquidSwipe,
        navigationOptions: {
          title: "Liquid Swipe",
          gesturesEnabled: false
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
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  </>
);
