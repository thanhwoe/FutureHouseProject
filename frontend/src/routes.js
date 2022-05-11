import React from "react";
import { Route,Switch } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import ProductList from "./containers/ProductList";
import ProductDetail from "./containers/ProductDetail";
import Checkout from "./containers/Checkout";
import Profile from "./containers/Profile";
import ThreeScene from './containers/ThreeJS';
import Download from './containers/Download';
import BlogDetai from './containers/BlogDetai';
import Dashboard from './containers/Dashboard';
import CategoryFilter from "./containers/CategoryFilter";
import HowToBuy from "./containers/componentsDocument/HowToBuy";
import ContactUs from "./containers/componentsDocument/ContactUs";
import PaymentMethod from "./containers/componentsDocument/PaymentMethod";
import PrivacyPolicy from "./containers/componentsDocument/PrivacyPolicy";
import TermsOfService from "./containers/componentsDocument/TermsOfService";
import AboutUs from "./containers/componentsDocument/AboutUs";
import BlogList from './containers/BlogsList';
import Chat from "./containers/Chat";
import NotFound404 from "./containers/components/NotFound404"

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/" component={HomepageLayout} />
    <Route exact path="/products" component={ProductList}/>
    <Route exact path="/products/:slug/:productID" component={ProductDetail}/>
    <Route exact path="/checkout" component={Checkout}/>
    <Route exact path="/profile" component={Profile}/>
    <Route exact path="/three" component={ThreeScene}/>
    <Route exact path="/download" component={Download}/>
    <Route exact path="/post/:slug/:postID" component={BlogDetai}/>
    <Route exact path="/dashboard" component={Dashboard}/>
    <Route exact path="/category/:style" component={CategoryFilter}/>
    <Route exact path="/doc/howtobuy" component={HowToBuy}/>
    <Route exact path="/doc/contactus" component={ContactUs}/>
    <Route exact path="/doc/paymentmethod" component={PaymentMethod}/>
    <Route exact path="/doc/privacypolicy" component={PrivacyPolicy}/>
    <Route exact path="/doc/termsofservice" component={TermsOfService}/>
    <Route exact path="/doc/aboutus" component={AboutUs}/>
    <Route exact path="/blogs-list" component={BlogList}/>
    <Route exact path="/chat/:chatID" component={Chat}/>
    {/* <Route path="*"  component={NotFound404}/> */}
  </Hoc>
);

export default BaseRouter;
