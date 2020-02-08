import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import * as _ from 'lodash';

import Seprator from './Seperator';

export const ROW_HEIGHT = 100;


const seperators = {
    10: 'Underweight',
    19: 'Healthy weight',
    24: "Healthy weight",
    25: "Overweight",
    29: "Overweight",
    30: "Obese"
}

const Graph = (props) => {
    const { from, to } = props;
    const iterations = to - from + 1
    return (
        <View style={styles.container}>
            {_.times(iterations).map((v, i) => {
                const BMI = from + i;
                return (
                    <React.Fragment key={i}>
                        {
                            (seperators[BMI] && seperators[BMI + 1]) && <Seprator />
                        }
                        <View style={styles.row}>
                            <Text style={styles.label}>{`BMI ${BMI}`}</Text>
                            {
                                seperators[BMI] && (
                                    <Text style={[styles.seperator, { alignSelf: seperators[BMI + 1] ? 'flex-start' : 'flex-end' }]}>{seperators[BMI]}</Text>
                                )
                            }
                        </View>

                    </React.Fragment>

                )
            }).reverse()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#69d0fb'
    },
    row: {
        height: ROW_HEIGHT,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        color: 'white',
        fontSize: 16
    },
    seperator: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)'
    }
});


export default Graph;