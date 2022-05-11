import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput, Pressable } from 'react-native';
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import axios from 'axios'
import { userIDURL } from '../apiURL'
import { icons } from '../constants';
import { useNavigation } from "@react-navigation/native"


const Profile = (props) => {
    const [userID, setUserID] = useState(null);
    const [username, setUsername] = useState('');
    const navigation = useNavigation()

    useEffect(() => {
        handleFetchUserID()
    }, []);
    const handleFetchUserID = () => {
        axios.get(userIDURL)
            .then(res => {
                setUserID(res.data.userID)
                setUsername(res.data.userName)
            })
            .catch(err => {

            })
    }
    const handleLogout = () => {
        props.logout()
    }
    const navigateToUserUpdate = ()=>{
        navigation.navigate('UserUpdate')
    }
    const navigateToUserOrder = ()=>{
        navigation.navigate('UserOrder')
    }
    const navigateToUserPayment = ()=>{
        navigation.navigate('UserPaymentHistory')
    }
    const navigateToUserWishlist = ()=>{
        navigation.navigate('UserWishlist')
    }
    
    function userReview() {
        return (
            <View style={styles.userReview}>
                <Text style={{ fontSize: 18, color: '#7f8c8d' }}>Welcome</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{username}</Text>
                <Text style={{marginLeft:'auto'}}>User ID: #{userID}</Text>
                </View>
            </View>
        )
    }
    function userAction() {
        return (
            <View>
            {/* personal information */}
            <Pressable style={styles.userAction} onPress={navigateToUserUpdate}>
                <Image
                    source={icons.avatar}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                />
                <Text style={styles.actionText}>Personal Information</Text>
                <Image
                    source={icons.next}
                    resizeMode="contain"
                    style={styles.arrowNext}
                />
            </Pressable>

            {/* Wishlist */}
            <Pressable style={styles.userAction} onPress={navigateToUserWishlist}>
                <Image
                    source={icons.wishlist}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                />
                <Text style={styles.actionText}>My Wishlist</Text>
                <Image
                    source={icons.next}
                    resizeMode="contain"
                    style={styles.arrowNext}
                />
            </Pressable>

             {/* Order in cart */}
             <Pressable style={styles.userAction} onPress={navigateToUserOrder}>
                <Image
                    source={icons.bagOrder}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                />
                <Text style={styles.actionText}>My Order</Text>
                <Image
                    source={icons.next}
                    resizeMode="contain"
                    style={styles.arrowNext}
                />
            </Pressable>

            {/* Paied order */}
            <Pressable style={styles.userAction} onPress={navigateToUserPayment}>
                <Image
                    source={icons.validCard}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                />
                <Text style={styles.actionText}>My Paid Order</Text>
                <Image
                    source={icons.next}
                    resizeMode="contain"
                    style={styles.arrowNext}
                />
            </Pressable>

            {/* logout */}
            <Pressable style={[styles.userAction, {backgroundColor:'#D5E3EB', borderRadius:25}]} onPress={handleLogout}>
            <Image
                    source={icons.logout}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                />
                <Text style={styles.actionText}>LOGOUT</Text>
            </Pressable>
            </View>
        )

    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={icons.mainLogoNoText}
                    resizeMode="contain"
                    style={{ width: 50, height: 50 }}
                />
            </View>
            {userReview()}
            {userAction()}
            
        </SafeAreaView>

    )
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
        marginVertical: 5
    },
    userReview: {
        height: 100,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#bdc3c7',
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    userAction: {
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
        marginTop: 25
    },
    actionText: {
        marginLeft: 15,
        fontSize: 18,
    },
    arrowNext: {
        width: 15,
        height: 15,
        tintColor: '#7f8c8d',
        marginLeft:'auto'
    }

})

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        //   fetchCart: () => dispatch(fetchCart()),

    };
};
export default connect(null, mapDispatchToProps)(Profile)

// export default Profile;
