import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput, Pressable } from 'react-native';
import { icons } from '../constants';
import { useNavigation } from "@react-navigation/native"


const BackNavigator = () => {
    const navigation = useNavigation()
    return (
        <View style={{
            position: 'absolute',
            left: 10,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            zIndex: 1
        }}>
            <TouchableOpacity style={{
                marginLeft: 10,
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                // shadown android
                elevation: 5,
                // shadown ios
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 1,

            }}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={icons.previous}
                    resizeMode='contain'
                    style={{ width: 20, height: 20 }} />

            </TouchableOpacity>
        </View>
    );
}

export default BackNavigator;

