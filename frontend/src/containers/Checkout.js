import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, ElementsConsumer, CardNumberElement } from "@stripe/react-stripe-js";
import { Button, Container, Tab, Icon, Image, Divider, Form, Item, Label, Message, Select, Header } from "semantic-ui-react";
import { authAxios } from "../utils";
import { checkoutURL, orderSummaryURL, orderItemDeleteURL, addCoupontURL, addressListURL, stripePaymentURL } from "../constants"
import { Link, Redirect, withRouter } from 'react-router-dom'
import ReactDOM from "react-dom"
import axios from "axios";
import { localhost } from "../constants";
import OrderPreview from "./components/OrderPreview";
import CouponForm from "./components/CouponForm";
import PaypalComponent from "./components/PaypalComponent";
import StripeComponent from "./components/StripeComponent";
import { connect } from 'react-redux'
import { fetchCart } from '../store/actions/cart'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const promise = loadStripe("pk_test_51IojgUHr5QaNTnevyp5SjZhL8GSICsczY8YsfoYrIyfahyBvAphpCokylrQneek03rkKGe1OtahPLbf6UaOw0qlo00Psuh9MpQ");

// const promise = loadStripe('pk_test_51IojgUHr5QaNTnevyp5SjZhL8GSICsczY8YsfoYrIyfahyBvAphpCokylrQneek03rkKGe1OtahPLbf6UaOw0qlo00Psuh9MpQ');


const CheckoutForm = (props) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        handleFetchOrder()
    }, []);
    const handleFetchOrder = () => {
        authAxios
            .get(orderSummaryURL)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            });
    }
    const handleRemoveItem = itemID => {
        authAxios
            .delete(orderItemDeleteURL(itemID))
            .then(res => {
                handleFetchOrder()
                props.refreshCart();
                NotificationManager.success('Success message', 'Product has been removed from your order');

            })
            .catch(err => {
                console.log(err)
            });
    }

    const handleAddCoupon = (e, code) => {
        e.preventDefault();
        authAxios
            .post(addCoupontURL, { code })
            .then(res => {
                handleFetchOrder()
                NotificationManager.success('Success message', 'Add voucher success', 5000);

            })
            .catch(err => {
                NotificationManager.error('Error message', 'Wrong voucher ', 5000);

            })
    }
    const handleTest = () => {
        authAxios
            .post(stripePaymentURL)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            });
    }

    const panes = [
        { menuItem: 'Paypal', render: () => <Tab.Pane><PaypalComponent getdata={data} /></Tab.Pane> },
        {
            menuItem: 'Stripe', render: () => <Tab.Pane>
                <Elements stripe={promise}>
                    <StripeComponent getdata={data} />
                </Elements>
            </Tab.Pane>
        }
    ]

    if (!props.isAuthenticated) {
        return <Redirect to='/login' />
    } else {

        return (
            <Container>
                {/* <Button onClick={handleTest}>Test</Button> */}
                <OrderPreview data={data} removeItem={handleRemoveItem} />
                <Divider />
                <CouponForm handleAddCoupon={(e, code) => handleAddCoupon(e, code)} />
                <Divider hidden />
                <Divider />
                <Header> Payment method</Header>
                <Tab panes={panes} defaultActiveIndex={0} />

            </Container>
        );
    }

}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshCart: () => dispatch(fetchCart())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)


