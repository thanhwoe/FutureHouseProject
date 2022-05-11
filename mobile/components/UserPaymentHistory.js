import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, Share, Image, FlatList, Platform, StatusBar, Dimensions,PermissionsAndroid, Pressable, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'
import { paymentListURL } from '../apiURL'
import { icons } from '../constants';
import { useNavigation } from "@react-navigation/native"
import BackNavigator from './BackNavigator';
import { localhost } from '../apiURL';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const UserPaymentHistory = () => {
    const [data, setData] = useState(null);
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


    return (
        <SafeAreaView style={styles.container}>
            <BackNavigator />
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <Text style={styles.header}>Payment History</Text>
            </View>
            <ScrollView>
                {data && data.map((p, i) => {
                    return (
                        <View style={styles.paymentView} key={i}>
                            {p.items.map((pItem, i) => {
                                return (
                                    <View style={styles.itemView} key={i}>
                                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#22a6b3' }}>
                                            <View style={styles.headItem}><Text style={{ fontSize: 20 }}>{pItem.item.title}</Text></View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <Image
                                                source={{ uri: pItem.item.thumbnail }}
                                                style={styles.smallIMG}
                                            />
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                                    <Text style={[styles.priceText, { textDecorationLine: 'line-through', color: '#535c68' }]}>${pItem.item.price}</Text>
                                                    <Text style={styles.priceText}>${pItem.item.discount_price}</Text>
                                                </View>
                                                {/* {permission && ( */}
                                                    <Pressable style={styles.customBtn} onPress={() => handleDownload(pItem.downloadUrl,pItem.item.title)}>
                                                        <Text>Download</Text>
                                                    </Pressable>
                                                {/* )} */}
                                                {/* <Text>{pItem.downloadUrl}</Text> */}
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}

                            <View style={{ flex: 1, alignSelf: 'flex-start', marginLeft: 25, marginVertical: 10, borderTopWidth: 1 }}>
                                <Text style={styles.priceText}>Date: {new Date(p.timestamp).toLocaleDateString()}</Text>
                                <Text style={styles.priceText}>Total: <Text style={{ fontWeight: 'bold' }}>${p.amount}</Text></Text>
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
    button: {
        paddingVertical: 12,
        paddingHorizontal: 80,
        borderRadius: 20,
        elevation: 5,
        backgroundColor: '#0fb9b1',
        marginVertical: 15
    },
    paymentView: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        borderColor: '#bdc3c7',

    },
    itemView: {
        width: '90%',
        backgroundColor: '#D5E3EB',
        borderRadius: 10,
        marginTop: 15

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
    headerDetail: {
        fontWeight: 'bold',
        backgroundColor: '#D5E3EB',
        paddingHorizontal: 2,
        paddingVertical: 3,
        marginVertical: 3,
        width: 110
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
    priceText: {
        fontSize: 17,
        marginRight: 20
    }

})

export default UserPaymentHistory;
