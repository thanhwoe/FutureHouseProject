import React, { createFactory } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import BlogList from '../screens/BlogList'
import Login from '../screens/Login'
import Cart from '../screens/Cart'
import { icons } from '../constants'
import Svg, { Path } from 'react-native-svg'
import { connect } from "react-redux";

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
    let isSelected = accessibilityState.selected
    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: "row", position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}></View>
                    <Svg width={75} height={61} viewBox='0 0 75 61'>
                        <Path d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill='#FFFFFF' />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}></View>
                </View>
                <TouchableOpacity
                    style={{
                        top: -20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: '#FFFFFF'
                    }}
                    onPress={onPress}>{children}</TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: '#FFFFFF'
                }}
                activeOpacity={1}
                onPress={onPress}>{children}</TouchableOpacity>
        )
    }
}



const Tabs = (props) => {
    const { loading,authenticated } = props
    // console.log(authenticated)
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                keyboardHidesTabBar: true,
                style: {
                    borderTopWidth: 0,
                    backgroundColor: "transparent",
                    elevation: 0
                }
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? "#0abde3" : "#646060"
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Cart'
                component={Cart}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.cart}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? "#0abde3" : "#646060"
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Blog'
                component={BlogList}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.file}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? "#0abde3" : "#646060"
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            {authenticated ? (

                <Tab.Screen
                    name='Profile'

                    component={Profile}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={icons.user}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#0abde3" : "#646060"
                                }}
                            />
                        ),
                        tabBarButton: (props) => (
                            <TabBarCustomButton
                                {...props}
                            />
                        )
                    }}
                />
            ) : (
                <Tab.Screen
                    name='Login'

                    component={Login}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={icons.user}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? "#0abde3" : "#646060"
                                }}
                            />
                        ),
                        tabBarButton: (props) => (
                            <TabBarCustomButton
                                {...props}
                            />
                        )
                    }}
                />
            )}


        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
});


const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        cart: state.cart.shoppingCart,
        loading: state.cart.loading
    };
};

export default connect(mapStateToProps, null)(Tabs)

// export default Tabs;
