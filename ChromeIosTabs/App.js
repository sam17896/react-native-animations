
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  MaskedViewIOS,
  StatusBar,
 } from 'react-native';
import Animated from 'react-native-reanimated';
import  TabBar,  { TABBAR_HEIGHT, TABBAR_WIDTH, TAB_WIDTH } from './components/Tabbar';

 const {
  Value,
  event,
 } = Animated;

const App = () => {

  const [state, setState] = useState({
    x: new Value(0)
  });
  const translateX = state.x.interpolate({
    inputRange: [0, TABBAR_WIDTH],
    outputRange: [0, TABBAR_WIDTH - TAB_WIDTH]
  });
  return (
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.container}>
          <TabBar color="#f8f9fa" backgroundColor="#828384" borderColor="#505152" />
          <MaskedViewIOS style={StyleSheet.absoluteFill} maskElement={
            <Animated.View style={[
              styles.activeTab, 
              { 
                transform: [
                  {translateX}
                ] 
              }
            ]
          }>
            </Animated.View>
          }>
            <TabBar color="#3b4043" backgroundColor="#f8f9fa" borderColor="#f8f9fa" />
          </MaskedViewIOS>     
          <Animated.ScrollView
            contentContainerStyle={{
              width: TABBAR_WIDTH * 2
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={false}
            snapToInterval={TAB_WIDTH + TAB_WIDTH / 2}
            onScroll={event([
              {
                nativeEvent: {
                  contentOffset: { x: state.x }
                }
              }
            ], { useNativeDriver: true })}
            style={StyleSheet.absoluteFill}>
          
          </Animated.ScrollView>     
        </View>

      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex:1,
    alignItems: 'center',
    backgroundColor: '#212223'
  },
  container: {
    width: TABBAR_WIDTH,
    height: TABBAR_HEIGHT
  },  
  activeTab: {
    backgroundColor: 'black',
    width: TAB_WIDTH,
    height: TABBAR_HEIGHT
  }
})
export default App;
