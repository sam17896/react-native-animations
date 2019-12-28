import React, { RefObject, useState } from "react";
import { StyleSheet, View } from "react-native";
import MaskedView from '@react-native-community/masked-view';  
import Animated from 'react-native-reanimated';
import Tabs from "./Tabs";
import { TabModel } from "./Content";
import { useValues, withTransition } from "react-native-redash";

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    height: 45,
    marginBottom: 8,
    flexDirection: "row"
  }
});

const {
  Value,
  useCode,
  block,
  cond,
  set,
  lessOrEq,
  and,
  lessThan,
  greaterThan,
  greaterOrEq,
  interpolate
} = Animated;

export default ({ tabs, transition, y, scrollView }) => {
  const [ index ] = useValues([0], [])
  const indexTransition = withTransition(index);
  const [measurements, setMeasurements] = useState(
    new Array(tabs.length).fill(0)
  );
  console.log(scrollView.current)
  const width = interpolate(indexTransition, {
    inputRange: tabs.map((tab, i) => i),
    outputRange: measurements
  });
  const translateX = interpolate(indexTransition, {
    inputRange: tabs.map((tab, i) => i),
    outputRange: tabs.map((_, i) => {
      return  -1 * measurements.filter((_, j) => j < i).reduce((acc, m)=> acc + m ,0) - 8 * i
    })
  });
  const opacity = transition;
  const style = {
    borderRadius: 24,
    backgroundColor: "black",
    width,
    flex: 1
  };
  useCode(
    () =>
      block(
        tabs.map((tab, i) =>
          cond(
            i === tabs.length - 1
              ? greaterOrEq(y, tab.anchor)
              : and(
                  greaterOrEq(y, tab.anchor),
                  lessOrEq(y, tabs[i + 1].anchor)
                ),
            set(index, i)
          )
        )
      ),
    [index, tabs, y]
  );
  return (
    <Animated.View style={[styles.container, { opacity }]}>
     <Animated.View style={{...StyleSheet.absoluteFillObject, 
      transform: [
        { translateX }
      ]
    }}>
    
    <Tabs
       
        onMeasurement={(i, m) => {
          measurements[i] = m;
          setMeasurements([...measurements]);
        }}
        {...{ tabs }}
      />
    </Animated.View> 
    
      <View>
        <Animated.View {...{ style }} />
      </View>
      <MaskedView style={StyleSheet.absoluteFill}
        maskElement={ <Animated.View {...{ style }} />}
      >
        <Animated.View style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            { translateX }
          ]
        }}>
          <Tabs
            active
            onPress={(i) => {
              console.log(i);
              if(scrollView.current) {
                scrollView.current.getNode().scrollTo({ y: tabs[i].anchor + 1 })
              }
            }}
            {...{ tabs }}
          />
        </Animated.View>
      </MaskedView>

    </Animated.View>
  );
};
