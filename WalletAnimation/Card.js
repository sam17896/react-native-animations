import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'

export const cardHeight = 250;
export const cardTitle = 45;
export const cardPadding = 10;

export class Card extends Component {
    render() {
        const {color} = this.props;
        return (
            <View style={[styles.card, {backgroundColor: color}]}>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    card: {
        height: cardHeight,
        borderRadius: 10,
    }
})

export default Card
