import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Button, Alert, FlatList, Platform, StatusBar, Dimensions, TextInput, ScrollView } from 'react-native';

// const { width } = Dimensions.get('window')


const Slide = props => {

    return (
        <View style={styles.slide}>
            <Image style={styles.image}
                source={{ uri: props.uri }}
                resizeMode='contain'

            />
        </View>)
}
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        width: Dimensions.get('window').width,
        flex: 1,
    }

})
export default Slide;
