import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { StyleGuide } from "./src/components";
import Examples, { examples } from "./src/Examples";
import AngularGradient from "./src/AngularGradient";
import Accordion from "./src/Accordion";
import ShaderAndMask from "./src/ShaderAndMask";
import CircularProgress from "./src/CircularProgress";
import Slider, { assets as sliderAssets } from "./src/Slider";
import Tabbar from "./src/Tabbar";
import Menu from "./src/Menu";

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Menu: {
        screen: Menu,
        navigationOptions: {
          title: "3d Animation",
          headerBackTitle: null
        }
      },
      Examples: {
        screen: Examples,
        navigationOptions: {
          title: "The 5 min React Native",
          headerBackTitle: null
        }
      },
      Tabbar: {
        screen: Tabbar,
        navigationOptions: {
          title: "Tabbar",
          headerBackTitle: null
        }
      },
      Slider: {
        screen: Slider,
        navigationOptions: {
          title: "Custom Slider",
          headerBackTitle: null
        }
      },
      CircularProgress: {
        screen: CircularProgress,
        navigationOptions: {
          title: "Circular Progress"
        }
      },
      AngularGradient: {
        screen: AngularGradient,
        navigationOptions: {
          title: "Angular Gradient"
        }
      },
      Accordion: {
        screen: Accordion,
        navigationOptions: {
          title: "Accordion"
        }
      },
      ShaderAndMask: {
        screen: ShaderAndMask,
        navigationOptions: {
          title: "Shader And Mask"
        }
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
