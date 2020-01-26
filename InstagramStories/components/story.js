import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, SafeAreaView, TextInput, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
export class Story extends Component {
    render() {
        const { story: { source } } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <Image style={styles.image} {...{ source }} />
                </View>
                <View style={styles.footer}>
                    <Icon name="camera" color="white" size={28} />
                    <TextInput style={styles.input} />
                    <Icon name="message-circle" color="white" size={28} />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
        borderRadius: 5,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    input: {
        borderWidth: 2,
        borderColor: 'white',
        height: 28,
        width: 250,
        borderRadius: Platform.OS === 'android' ? 0 : 10,
    },
})

export default Story
