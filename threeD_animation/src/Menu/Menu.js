import React, { useState } from 'react';
import { 
    StyleSheet, View
 } from 'react-native'

 import Screen from './Screen';

 import Profile from './Profile';
import { Value } from 'react-native-reanimated';
import { withTransition, withSpringTransition } from 'react-native-redash';

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: 'black',
     },
     layer: {
         ...StyleSheet.absoluteFillObject,
         justifyContent: 'center'
     }
 });


 export default () => {
     const open = new Value(0);
     const transition = withSpringTransition(open);
     return (
         <View style={styles.container}>
            <Screen onPress={() => open.setValue(1) } {...{ open, transition }} />
            <View style={styles.layer} pointerEvents="box-none">
                <Profile  onPress={() => open.setValue(0) } {...{ open, transition }} />
            </View>
         </View>
     )
 }