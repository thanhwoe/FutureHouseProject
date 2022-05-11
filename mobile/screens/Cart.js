import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput, Pressable, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'
import { orderItemDeleteURL, orderSummaryURL } from '../apiURL'
import { icons } from '../constants';
import { useNavigation } from "@react-navigation/native"
import { localhost } from '../apiURL';
import { fetchCart } from '../store/actions/cart';

const Cart = (props) => {
    const [data, setData] = useState(null);
    const navigation = useNavigation()
    useEffect(() => {
        if (props.authenticated) {
            props.refreshCart()
            // handleFetchOrder()
        }
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
    const handleRemoveItem = itemID => {
        axios
            .delete(orderItemDeleteURL(itemID))
            .then(res => {
                // handleFetchOrder()
                props.refreshCart()

            })
            .catch(err => {

            });
    }
    const navigateCheckOut = () => {
        navigation.navigate('CheckOut', { data: data })
    }
    const navigateLogin = () => {
        navigation.navigate('Login')
    }
    const navigateSignUp = () => {
        navigation.navigate('SignUp')
    }



    if (props.authenticated) {
        () => props.refreshCart()
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>Cart</Text>
                    <TouchableOpacity
                        onPress={navigateCheckOut}
                    >
                        <Text style={styles.customBtn} >Checkout</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {props.cart && props.cart.order_items.map((orderItem, i) => {
                        return (
                            <View key={i} style={styles.orderView}>
                                <Image
                                    style={styles.smallIMG}
                                    source={{
                                        uri: `${orderItem.item.thumbnail}`,
                                    }}
                                />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 20 }}>{orderItem.item.title}</Text>
                                    <Text style={styles.headerDetail}>Style: <Text style={{ fontWeight: 'normal' }}>{orderItem.item.category}</Text></Text>
                                    <Text style={styles.headerDetail}>Label: <Text style={{ fontWeight: 'normal' }}>{orderItem.item.label}</Text></Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#718093', textDecorationLine: 'line-through', marginRight: 5, fontSize: 16 }}>${orderItem.item.price}</Text>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>${orderItem.item.discount_price}</Text>
                                        <Pressable style={{ marginLeft: 'auto' }} onPress={() => handleRemoveItem(orderItem.id)}>
                                            <Image
                                                source={icons.deleteIcon}
                                                resizeMode="contain"
                                                style={{ width: 20, height: 20, tintColor: 'red', }}
                                            />
                                        </Pressable>

                                    </View>

                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>Cart</Text>
                </View>
                <View style={styles.textView}>
                    <View style={styles.textItem}>
                        <Text style={{ fontSize: 20 }} >You need to login to view your cart! </Text>
                        <Pressable onPress={navigateLogin} >
                            <Text style={styles.textLink}> Login</Text>
                        </Pressable>
                    </View>
                    <View style={styles.textItem}>
                        <Text style={{ fontSize: 20 }} >Don't have an account? </Text>
                        <Pressable onPress={navigateSignUp} >
                            <Text style={styles.textLink}> Resgister</Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
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
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    textView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    textLink: {
        fontSize: 20,
        justifyContent: 'center',
        color: '#3867d6'
    }

})

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        cart: state.cart.shoppingCart,
        loading: state.cart.loading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        refreshCart: () => dispatch(fetchCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

