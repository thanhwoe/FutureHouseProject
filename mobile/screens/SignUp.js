import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Pressable, Keyboard, FlatList, Platform, StatusBar, Dimensions, TextInput, Alert } from 'react-native';
import { icons } from '../constants';
import { connect } from "react-redux";
import { authSignup } from "../store/actions/auth";
import { useNavigation } from "@react-navigation/native"

const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
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
        if (username == '' || password1 == '' || password2 == '' || email == '') {
            Alert.alert('Fill in the information first')
        } else {
            props.signup(username, email, password1, password2);
            navigation.navigate('Home')

        }

    }
    function renderHeader() {
        return (
            <View style={{
                zIndex: 1,
                position: 'absolute',
                left: 10,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}>
                <TouchableOpacity style={{
                    marginLeft: 10,
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 10,
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF'
                }}
                    onPress={() => navigation.goBack()}
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
            {renderHeader()}
            {!isKeyboard ? (<Image
                source={icons.mainLogo}
                resizeMode="contain"
                style={{ width: 300, height: 250 }}
            />) : (<View />)}

            <Text style={styles.header}> Register Now</Text>
            <Text style={{ color: '#778ca3', marginTop: 10 }}>Please enter the details below to continue.</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"

            />
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"

            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword1}
                value={password1}
                placeholder="Password"
                secureTextEntry={true}

            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword2}
                value={password2}
                placeholder="Confirm Password"
                secureTextEntry={true}

            />
            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#FFFFFF' }}>REGISTER</Text>
            </Pressable>
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
        paddingHorizontal: 60,
        borderRadius: 20,
        elevation: 5,
        backgroundColor: '#0fb9b1',
        marginVertical: 15
    },

})
const mapDispatchToProps = dispatch => {
    return {
        signup: (username, email, password1, password2) =>
            dispatch(authSignup(username, email, password1, password2))
    };
};
export default connect(null, mapDispatchToProps)(SignUp);
// export default SignUp;
