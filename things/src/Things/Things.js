import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Transitioning, Transition } from 'react-native-reanimated';
import Content from "./Content";
import ScrollView from "./ScrollView";
import Search from "./Search";
import SearchBox from "./SearchBox";
import { useMemoOne } from "use-memo-one";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const {
  Value
} = Animated

const transition = (
<Transition.Together>
  <Transition.In durationMs={400}  type="scale"></Transition.In>
  <Transition.Out durationMs={400} type="scale"></Transition.Out>
</Transition.Together>
)

export default () => {
  const ref = useRef(null);
  const [search, setSearch] = useState(false);
  const translateY = useMemoOne(() => new Value(0), []);
  return (
    <Transitioning.View style={styles.container} {...{ transition, ref }}>
      <Search {...{translateY}} />
      <ScrollView onPull={() => {
        if(ref.current) {
          ref.current.animateNextTransition()
        }
        setSearch(true)
      }} {...{translateY}}>
        <Content />
      </ScrollView>
      <SearchBox visible={search} onRequestClose={() => {
        if(ref.current) {
          ref.current.animateNextTransition()
        }
        setSearch(false)
      }} />
    </Transitioning.View>
  );
};
