import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput, Pressable, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'
import { paymentListURL } from '../apiURL'
import { icons } from '../constants';
import { useNavigation } from "@react-navigation/native"
import { localhost } from '../apiURL';
import { fetchCart } from '../store/actions/cart';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const Download = () => {
    const [data, setData] = useState(null);
    const [permission, setpermission] = useState(null);
    const navigation = useNavigation()
    useEffect(() => {
        handleFetchPayment();
    }, []);
    const handleFetchPayment = () => {
        axios
            .get(paymentListURL)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            });
    }

    const handleDownload = async (url, name) => {
        let filename = name.replace(/\s/g, '-')
        const fileURI = await FileSystem.downloadAsync(
            url,
            FileSystem.documentDirectory+ `${filename}.zip` ,
            {}
        );

        await Sharing.shareAsync(fileURI.uri);
    }

    

    function backToHome() {
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
                    onPress={() => navigation.navigate('Home', { screen: 'Home' })}
                >
                    <Image
                        source={icons.previous}
                        resizeMode='contain'
                        style={{ width: 20, height: 20 }} />

                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {backToHome()}
            <View style={styles.headerView}>
                <Text style={styles.header}>Download</Text>
            </View>
            <ScrollView >
                {data && data.pop().items.map((pItem, i) => {
                    return (
                        <View style={styles.itemView} key={i}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#22a6b3' }}>
                                <View style={styles.headItem}><Text style={{ fontSize: 20 }}>{pItem.item.title}</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Image
                                    source={{ uri: `${pItem.item.thumbnail}` }}
                                    style={styles.smallIMG}
                                />
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                        <Text style={[styles.priceText, { textDecorationLine: 'line-through', color: '#535c68' }]}>${pItem.item.price}</Text>
                                        <Text style={styles.priceText}>${pItem.item.discount_price}</Text>
                                    </View>
                                    <Pressable style={styles.customBtn} onPress={()=>handleDownload(pItem.downloadUrl,pItem.item.title)}>
                                        <Text>Download</Text>
                                    </Pressable>

                                    {/* <Text>{pItem.downloadUrl}</Text> */}
                                </View>
                            </View>
                        </View>
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
    customBtn: {
        borderRadius: 5,
        paddingVertical: 10,
        backgroundColor: '#0fb9b1',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#dff9fb',
        paddingHorizontal: 10
    },
    headerView: {
        alignItems: 'center',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    itemView: {
        width: '90%',
        backgroundColor: '#D5E3EB',
        borderRadius: 10,
        marginTop: 15,
        marginLeft: '5%'

    },
    headItem: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    smallIMG: {
        width: 130,
        height: 100,
        marginHorizontal: 10,
        marginVertical: 5
    },
    priceText: {
        fontSize: 17,
        marginRight: 20
    }

})



export default Download

