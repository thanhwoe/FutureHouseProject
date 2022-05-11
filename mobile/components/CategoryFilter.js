import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput, Pressable, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'
import { productListURL } from '../apiURL'
import { icons } from '../constants';
import { useNavigation, useRoute } from "@react-navigation/native"
import BackNavigator from './BackNavigator';
import { localhost } from '../apiURL';


const CategoryFilter = () => {
    const [data, setData] = useState(null);
    const navigation = useNavigation()
    const route = useRoute()
    let itemCate = route.params.item
    useEffect(() => {
        handleFetchData()
    }, []);
    const handleFetchData = () => {
        axios
            .get(productListURL)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            });
    }



    return (
        <SafeAreaView style={styles.container}>
            <BackNavigator />
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <Text style={styles.header}>{itemCate.name}</Text>
            </View>
            <ScrollView>
                {data&& data.filter(item => {
                    return item.category === itemCate.name
                }).map((item,i) => {
                    return (
                        <TouchableOpacity
                            style={{ marginBottom: 60 }}
                            onPress={() => navigation.navigate('ProductDetail', {
                                item
                            })}
                            key={i}
                        >
                            <View
                                style={{
                                    width: "90%",
                                    // height: 250,
                                    marginLeft: '5%',
                                    marginBottom: 10,
                                    borderRadius: 25,
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={{ uri: item.thumbnail }}
                                    resizeMode='cover'
                                    style={{
                                        width: '100%',
                                        height: 200,
                                        borderRadius: 20
                                    }}
                                />
                                <View
                                    style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        bottom: -50,
                                        width: '80%',
                                        borderRadius: 20,
                                        paddingLeft: 15,
                                        flexDirection: 'column',
                                        backgroundColor: '#D5E3EB',
                                        paddingBottom: 15,
                                        ...styles.shadow
                                    }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: 'black',
                                        marginTop: 5,
                                        marginBottom: 5
                                    }}>{item.title}</Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        paddingRight: 20
                                    }}>
                                        <Text style={{
                                            fontSize: 15,
                                            color: 'black',
                                        }}>{item.label}</Text>
                                        <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
                                            <Text style={{
                                                fontSize: 18,
                                                color: 'grey',
                                                textDecorationLine: 'line-through',
                                            }}>${item.price}</Text>
                                            <Text style={{
                                                fontSize: 18,
                                                color: 'black',
                                                marginLeft: 30
                                            }}>${item.discount_price}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: '#F5F5F5',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 80,
        borderRadius: 20,
        elevation: 5,
        backgroundColor: '#0fb9b1',
        marginVertical: 15
    },
    userReview: {
        width: '80%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#bdc3c7',
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginTop: 20
    },
    orderView: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        flex: 1,
        marginVertical: 5
    },
    smallIMG: {
        width: 130,
        height: 100,
        marginRight: 10
    },
    headerDetail: {
        fontWeight: 'bold',
        backgroundColor: '#D5E3EB',
        paddingHorizontal: 2,
        paddingVertical: 3,
        marginVertical: 3,
        width: 110
    },
    btnSticky: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#D5E3EB',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    customBtn: {
        borderRadius: 5,
        paddingVertical: 10,
        backgroundColor: '#eb4d4b',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#dff9fb',
        paddingHorizontal: 10
    },
    couponText: {
        fontSize: 17,
        marginRight: 20
    }

})

export default CategoryFilter;