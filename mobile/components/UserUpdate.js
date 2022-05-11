import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput, Pressable } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'
import { authUserURL, userUpdateURL,isStaffURL,superUserURL } from '../apiURL'
import { icons } from '../constants';
import { useNavigation } from "@react-navigation/native"
import BackNavigator from './BackNavigator';


const UserUpdate = () => {
    const initialFormData = Object.freeze({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        id: null
    });
    const [formData, updateFormData] = useState(initialFormData);
    const [staff, setstaff] = useState();
    const [admin, setadmin] = useState();
    const navigation = useNavigation()

    useEffect(() => {
        handleFetchItem()
        handelCheckStaff()
        handelCheckAdmin()
    }, [updateFormData]);
    const handleFetchItem = () => {
        axios
            .get(authUserURL)
            .then((res) => {
                updateFormData({
                    ...formData,
                    ['username']: res.data.username,
                    ['first_name']: res.data.first_name,
                    ['last_name']: res.data.last_name,
                    ['email']: res.data.email,
                    ['id']: res.data.id,
                });
            });
    }

    const handleSubmit = () => {
        console.log(formData)
        let DataForm = new FormData();
        DataForm.append('first_name', formData.first_name)
        DataForm.append('last_name', formData.last_name)
        DataForm.append('email', formData.email)
        axios
            .put(userUpdateURL(formData.id), DataForm)
            .then(res => {
                Alert.alert(
                    'Notificaiton',
                    "Successfully updated personal information",
                    [
                        {
                            text: "Ok",
                            style: "cancel"
                        }
                    ]
                )
            })
            .catch(err => {
                Alert.alert(
                    'Notificaiton',
                    "Update failed",
                    [
                        {
                            text: "Ok",
                            style: "cancel"
                        }
                    ]
                )
            })
    };
    const handelCheckStaff = () => {
        axios
            .get(isStaffURL)
            .then(res => {
                setstaff( res.data.isStaff )
            })
            .catch(err => {
            });
    }
    const handelCheckAdmin = () => {
        axios
            .get(superUserURL)
            .then(res => {
                setadmin(res.data.isAdmin )
            })
            .catch(err => {
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackNavigator/>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.header}>Profile</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => updateFormData({ ...formData, 'first_name': text.trim() })}
                    value={formData.first_name}
                    placeholder="First Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => updateFormData({ ...formData, 'last_name': text.trim() })}
                    value={formData.last_name}
                    placeholder="Last Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => updateFormData({ ...formData, 'email': text.trim() })}
                    value={formData.email}
                    placeholder="Email"
                />
                <View style={styles.userReview}>
                    <Text style={{ fontSize: 18, color: 'black', marginBottom: 10 }}>Group Permission</Text>
                    {admin&&(
                        <Text>- Admin</Text>
                    )}
                    {staff&&(
                        <Text>- Staff</Text>
                    )}
                    <Text>- Customer</Text>
                </View>
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#FFFFFF' }}>Update</Text>
                </Pressable>
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
    input: {
        height: 50,
        width: '85%',
        marginTop: 15,
        padding: 10,
        backgroundColor: '#D5E3EB',
        borderRadius: 10,
        fontSize: 18
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
    }
})

export default UserUpdate;
