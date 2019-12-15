import React from 'react';

import {
    View,
    Dimensions,
    Animated,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';

const { width } = Dimensions.get('window');

import Icon from 'react-native-vector-icons/Feather';
export const tabHeight = 64;

const StaticTabbar = (props) => {
    

    
    onPress = (index) => {
        const { value, tabs } = props;
        const tabWidth = width / tabs.length;

        Animated.sequence([
            ...values.map(value => Animated.timing(value, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            })),
            Animated.parallel([
                Animated.spring(values[index], {
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.spring(value, {
                    toValue: - width +  tabWidth * index,
                    useNativeDriver: true
                })
            ])
        ]).start();
        
    }
    
    const { tabs, value } = props;

    values = tabs.map((tab, index) => new Animated.Value(index === 0 ? 1 : 0));

    const tabWidth = width / tabs.length;
    
    
    return (
       <View style={styles.container}>
        {
            tabs.map(({name}, key) => {
                const opacity = value.interpolate({
                    inputRange: [ -width + tabWidth * (key - 1),-width + tabWidth * key,  -width + tabWidth * (key+1)],
                    outputRange: [1, 0, 1],
                    extrapolate: "clamp"
                });

                const activeValue = values[key];

                const translateY = activeValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [tabHeight, 0],
                })

                return ( 
                    <React.Fragment key={key}>
                        <TouchableWithoutFeedback onPress={() => onPress(key)}>
                            <Animated.View style={[styles.tab, {opacity}]}>
                                <Icon size={25} name={name} />
                            </Animated.View>
                        </TouchableWithoutFeedback>
                        <Animated.View style={{ 
                            position: 'absolute',  
                            width: tabWidth, 
                            top: -8,
                            left: tabWidth * key, 
                            height: tabHeight, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            transform: [{translateY}]
                        }}>
                            <View style={styles.circle}>
                                <Icon size={25} name={name} />
                            </View>
                        </Animated.View>
                    </React.Fragment>
                )
            })
        }
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    tab: {
        flex: 1,
        height: tabHeight,
        justifyContent: 'center',
        alignItems: 'center',
     //   backgroundColor: 'blue'
    },
    circle: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'white'
    }
})

export default StaticTabbar;