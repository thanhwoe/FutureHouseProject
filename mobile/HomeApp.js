import React,{ useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Profile from './screens/Profile'
import Test from './screens/Test'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import ProductDetail from './screens/ProductDetail'
import CheckOut from './screens/CheckOut'
import UserUpdate from './components/UserUpdate'
import UserOrder from './components/UserOrder'
import UserWishlist from './components/UserWishlist'
import UserPaymentHistory from './components/UserPaymentHistory'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Tabs from './navigation/Tabs';
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";
import Cart from './screens/Cart';
import BlogDetail from './screens/BlogDetail';
import Search from './components/Search';
import CategoryFilter from './components/CategoryFilter';
import StripeComponent from './components/StripeComponent';
import Download from './screens/Download';

const Stack = createStackNavigator()

const HomeApp = (props) => {
  // console.log( props.isAuthenticated +'assssa')
  // console.log('adasdfdsa')
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Home'}
      >
        <Stack.Screen name='Home' component={Tabs} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='ProductDetail' component={ProductDetail} />
        <Stack.Screen name='Test' component={Test} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='UserUpdate' component={UserUpdate} />
        <Stack.Screen name='UserOrder' component={UserOrder} />
        <Stack.Screen name='UserWishlist' component={UserWishlist} />
        <Stack.Screen name='CheckOut' component={CheckOut} />
        <Stack.Screen name='UserPaymentHistory' component={UserPaymentHistory} />
        <Stack.Screen name='Cart' component={Cart} />
        <Stack.Screen name='BlogDetail' component={BlogDetail} />
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='CategoryFilter' component={CategoryFilter} />
        <Stack.Screen name='StripeComponent' component={StripeComponent} />
        <Stack.Screen name='Download' component={Download} />

      </Stack.Navigator>
    </NavigationContainer>
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
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeApp);

//   "main": "node_modules/expo/AppEntry.js", ---> file package.json