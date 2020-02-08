import React from 'react';
import {
    View, StyleSheet,
    Text, Dimensions
} from 'react-native';
import * as _ from 'lodash';


const dashes = 50;
const width = Dimensions.get("window").width / (dashes * 2);



const Seperator = () => {   
    return (
        <View style={styles.container}>
            {
                _.times(dashes).map((v, i) => (<View key={i}  style={styles.dash} />))
            }
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    dash: {
        width,
        marginRight: width,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.8)'

    }
});

export default Seperator;