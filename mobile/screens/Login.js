import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput, Button, Pressable, Keyboard, Alert } from 'react-native';
import { icons } from '../constants';
import { connect } from "react-redux";
import { authLogin } from "../store/actions/auth";
import { useNavigation } from "@react-navigation/native"

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isKeyboard, setKeyboard] = useState(false);
    const navigation = useNavigation()
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboard(true)
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboard(false)
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleSubmit = () => {
        console.log(username)
        console.log('pas'+password)
        if (username=='' || password==''){
            Alert.alert('Fill in the information first')
        }else{
            props.login(username, password)

        }
    }
    const redirectToResetPassword = () => {
        console.log('pressed2')
    }
    const redirectToSignUp = () => {
        navigation.navigate('SignUp')
    }


    return (
        <SafeAreaView style={styles.container}>
            {!isKeyboard ? (<Image
                source={icons.mainLogo}
                resizeMode="contain"
                style={{ width: 300, height: 250 }}
            />) : (<View />)}

            <Text style={styles.header}> Login Now</Text>
            <Text style={{ color: '#778ca3', marginVertical: 10 }}>Please enter the details below to continue.</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"

            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}

            />
            <Pressable onPress={redirectToResetPassword}>
                <Text style={{ marginVertical: 10, marginLeft: "50%", color: '#3867d6', fontWeight: "500" }}>Forgot Password?</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#FFFFFF' }}>LOGIN</Text>
            </Pressable>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginTop: 10 }}>Don't have an account!</Text>
                <Pressable onPress={redirectToSignUp} style={{ marginTop: 10 }}>
                    <Text style={{ color: '#3867d6', }}> Resgister</Text>
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
        alignItems: 'center'
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold'
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
        marginVertical: 5
    },

})
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(authLogin(username, password))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
