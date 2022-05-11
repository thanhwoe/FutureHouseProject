import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput, Pressable, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'
import { orderItemDeleteURL, orderSummaryURL, addCoupontURL } from '../apiURL'
import { icons } from '../constants';
import { useNavigation } from "@react-navigation/native"
import { localhost } from '../apiURL';
import BackNavigator from '../components/BackNavigator';

const CheckOut = () => {
    // let { data } = route.params
    const [data, setData] = useState(null);
    const [code, setCode] = useState('');
    const navigation = useNavigation()
    var num = 0
    useEffect(() => {
        handleFetchOrder()
    }, []);

    const handleFetchOrder = () => {
        axios
            .get(orderSummaryURL)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            });
    }
    const handleAddCoupon = (code) => {
        let coupon = code.trim()
        if (coupon == '') {
            Alert.alert('You need input Voucher first')
        } else {
            axios
                .post(addCoupontURL, { coupon })
                .then(res => {
                    handleFetchOrder()
                })
                .catch(err => {
                    // console.log(JSON.stringify(err))
                    Alert.alert('Your voucher is not correct!')
                })
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <BackNavigator />
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <Text style={styles.header}>Checkout</Text>
            </View>
            {data && (
                <View style={[styles.checkoutView, { marginBottom: 10 }]}>
                    <Text style={styles.detailText}>Order: #{data.id}</Text>
                    <Text style={styles.detailText}>User: {data.user}</Text>
                    <Text style={styles.detailText}>Order Date: {new Date(data.ordered_date).toLocaleTimeString()} - {new Date(data.ordered_date).toLocaleDateString()}</Text>
                    <Text style={styles.detailText}>Status: {data.ordered ? (<Text>Completed</Text>) : (<Text>Pending</Text>)}</Text>
                    <Text style={styles.detailText}>Total Bill:
                        {data.order_items.map((item, i) => {
                            num += item.final_price
                            return (null)
                        })}
                        ${num}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setCode}
                            value={code}
                            placeholder="Voucher"
                        />

                        <Pressable style={styles.custBtn} onPress={() => handleAddCoupon(code)}>
                            <Image
                                source={icons.coupon}
                                resizeMode="contain"
                                style={{ width: 25, height: 25 }}
                            />
                        </Pressable>
                    </View>
                    {data.coupon && (
                        <Text style={styles.detailText}>
                            Voucher: {data.coupon.code} for
                            <Text style={{ fontWeight: 'normal' }}> ${data.coupon.amount}</Text>
                        </Text>
                    )}
                    <Text style={styles.detailText}>Total Payment: <Text style={{ fontWeight: 'bold' }}>${data.total}</Text></Text>
                </View >
            )}
            <View style={styles.checkoutView}>
                <Text style={{ fontWeight: 'bold' }}>Payment Method</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                    <Pressable onPress={() => navigation.navigate('StripeComponent', { getData: data })} style={{ backgroundColor: '#1e90ff', ...styles.payBtn }}>
                        <Text>Stripe</Text>
                    </Pressable>
                    <Pressable style={{ backgroundColor: '#b2bec3', ...styles.payBtn }}>
                        <Text>Paypal</Text>
                    </Pressable>
                    {/* <Pressable onPress={() => navigation.navigate('Download')} style={{ backgroundColor: '#1e90ff', ...styles.payBtn }}>
                        <Text>text</Text>
                    </Pressable> */}
                </View>
            </View>

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
    checkoutView: {
        width: 'auto',
        borderWidth: 1,
        borderColor: '#bdc3c7',
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginHorizontal: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    input: {
        width: '50%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#D5E3EB',
        borderRadius: 5,
        fontSize: 18,
        marginVertical: 5,
        marginRight: 30
    },
    couponText: {
        fontSize: 17,
        marginRight: 20
    },
    detailText: {
        fontSize: 18
    },
    custBtn: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: '#1e90ff',
        borderRadius: 5
    },
    couponText: {
        fontSize: 17,
    },
    payBtn: {
        width: 80,
        paddingVertical: 6,
        borderRadius: 5,
        alignItems: 'center'
    }

})
export default CheckOut;

