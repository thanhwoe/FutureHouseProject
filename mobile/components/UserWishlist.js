import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput, Pressable, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'
import { wishlistURL,addWishlistURL,addToCartURL } from '../apiURL'
import { icons } from '../constants';
import { useNavigation } from "@react-navigation/native"
import BackNavigator from './BackNavigator';
import { localhost } from '../apiURL';

const UserWishlist = () => {
    const [data, setData] = useState(null);
    const navigation = useNavigation()
    useEffect(() => {
        handleFetchWishlist()
    }, []);
    const handleFetchWishlist = () => {
        axios
            .get(wishlistURL)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            });
    }
    const handleRemoveWishList = (id) => {
            axios
                .post(addWishlistURL(id))
                .then(res => {
                    handleFetchWishlist()
                })
                .catch(err => {
                });
    }
    const handleAddToCart = (slug,id) => {
            axios
                .post(addToCartURL, { slug })
                .then(res => {
                    handleRemoveWishList(id)
                    if (res.data) {
                        Alert.alert(res.data.message)
                    }
                })
                .catch(err => {
                    // console.log(err)
                });
    }
    // console.log(data)

    return (
        <SafeAreaView style={styles.container}>
            <BackNavigator />
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <Text style={styles.header}>My Wishlist</Text>
            </View>
            <ScrollView>
                {data && data.map((item, i) => {
                    return (
                        <View key={i} style={styles.orderView}>
                            <Image
                                style={styles.smallIMG}
                                source={{
                                    uri: item.thumbnail,
                                }}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 20 }}>{item.title}</Text>
                                <Text style={styles.headerDetail}>Style: <Text style={{ fontWeight: 'normal' }}>{item.category}</Text></Text>
                                <Text style={styles.headerDetail}>Label: <Text style={{ fontWeight: 'normal' }}>{item.label}</Text></Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#718093', textDecorationLine: 'line-through', marginRight: 5, fontSize: 16 }}>${item.price}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>${item.discount_price}</Text>
                                    <Pressable style={{ marginLeft: 'auto' }} onPress={() => handleAddToCart(item.slug,item.id)}>
                                        <Image
                                            source={icons.cart}
                                            resizeMode="contain"
                                            style={{ width: 20, height: 20, tintColor: 'green', }}
                                        />
                                    </Pressable>
                                    <Pressable style={{ marginLeft: 'auto' }} onPress={() => handleRemoveWishList(item.id)}>
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

export default UserWishlist;
