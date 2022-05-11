import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, Animated, Image, Easing, Platform, StatusBar, Dimensions, TextInput, Pressable, ScrollView } from 'react-native';
import axios from 'axios'
import { useNavigation, useRoute } from "@react-navigation/native"
import BackNavigator from './BackNavigator';
import { icons } from '../constants';
import { stripePaymentURL, checkoutURL, downloadURL } from '../apiURL'

import {
    CardField,
    StripeProvider,
    useStripe,
} from '@stripe/stripe-react-native';

const StripeComponent = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { confirmPayment } = useStripe();
    let { getData } = route.params
    const [itemIDsold, setItemIDsold] = useState([]);
    const [listURL, setListURL] = useState([]);
    const [key, setKey] = useState();
    const [loading, setLoading] = useState(false);




    let rotateValueHolder = new Animated.Value(0);
    Animated.loop(
        Animated.timing(
            rotateValueHolder,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start();
    const rotateData = rotateValueHolder.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });



    useEffect(() => {
        handleFetchClientSecret()
        handleAddItem()
    }, []);

    const handleAcceptPayment = async () => {
        setLoading(!loading)
        if (key) {
            const { error } = await confirmPayment(key, {
                type: 'Card'
            });
            if (!error) {
                handleCheckOut()

            } else {
                Alert.alert(
                    'Error',
                     error.message,
                [
                    { text: "OK", onPress: () => setLoading(false) }
                ]
                );
                
            }
        }
    }
    const handleFetchClientSecret = () => {
        axios
            .post(stripePaymentURL)
            .then(res => {
                setKey(res.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            });
    }
    const handleAddItem = () => {
        const array = getData.order_items
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            setItemIDsold(oldArray => [...oldArray, element.item.id]);
            axios
                .get(downloadURL(element.item.id))
                .then(res => {
                    setListURL(oldArray => [...oldArray, res.config.url]);
                })
                .catch(err => {

                })

        }
    }

    const handleCheckOut = () => {
        axios
            .post(checkoutURL, { itemIDsold, listURL })
            .then(res => {
                Alert.alert(
                    "Success",
                    "Your order has been successfully paid",
                    [
                        { text: "OK", onPress: () => navigation.navigate('Download') }
                    ]
                );
            })
            .catch(err => {
                setItemIDsold([])
                setListURL([])
            })
    };







    return (
        <StripeProvider
            publishableKey="pk_test_51IojgUHr5QaNTnevyp5SjZhL8GSICsczY8YsfoYrIyfahyBvAphpCokylrQneek03rkKGe1OtahPLbf6UaOw0qlo00Psuh9MpQ"
            merchantIdentifier="merchant.identifier">
            <SafeAreaView style={styles.container}>
                <BackNavigator />
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <Text style={styles.header}>Stripe Payment</Text>
                </View>
                <CardField
                    postalCodeEnabled={false}
                    placeholder={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                    }}
                    onCardChange={cardDetails => {
                        // console.log('cardDetails', cardDetails);
                    }}
                    onFocus={focusedField => {
                        // console.log('focusField', focusedField);
                    }}
                />
                {!loading ? (
                    <Pressable style={styles.customBtn} onPress={handleAcceptPayment}><Text style={styles.textBtn}>Pay</Text></Pressable>
                ) : (
                    <View style={styles.customBtn} >
                        <Animated.Image
                            style={{
                                width: 30,
                                height: 25,
                                transform: [{ rotate: rotateData }],
                            }}
                            source={icons.loading}
                        />
                    </View>
                )}

            </SafeAreaView>
        </StripeProvider>
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
        backgroundColor: '#D5E3EB',
        textAlign: 'center',
        paddingHorizontal: 30,
        alignSelf: 'center',
        elevation: 5,
    },
    textBtn: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0abde3'
    }

})
export default StripeComponent;
