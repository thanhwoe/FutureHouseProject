import React, { useState, useEffect } from 'react';
import { authAxios } from "../../utils";
import { checkoutURL, downloadURL, stripePaymentURL } from "../../constants"
import { Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message } from 'semantic-ui-react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import ReactDOM from "react-dom"
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import img from '../../image/chip.png'
import img2 from '../../image/wifi.png'

const StripeComponent = (props) => {
    const [key, setKey] = useState();
    const [itemIDsold, setItemIDsold] = useState([]);
    const [listURL, setListURL] = useState([]);

    const [isPaid, setISPaid] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        handleFetchClientSecret()
        handleAddItem()
    }, []);

    const handleFetchClientSecret = () => {
        authAxios
            .post(stripePaymentURL)
            .then(res => {
                setKey(res.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            });
    }

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(key, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (payload.error) {
            NotificationManager.error('Payment failed', ` ${payload.error.message}`, 5000);
            setProcessing(false);
        } else {
            handleCheckOut()
            NotificationManager.success('Success message', 'Payment success', 5000);
            setProcessing(false);
            setSucceeded(true);

        }
    };

    const handleAddItem = () => {
        const array = props.getdata.order_items
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            setItemIDsold(oldArray => [...oldArray, element.item.id]);
            axios
            .get(downloadURL(element.item.id))
            .then(res => {
                console.log(res)
                setListURL(oldArray => [...oldArray, res.data]);
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
            
        }
        
    }
    
    const handleCheckOut = () => {
        authAxios
            .post(checkoutURL, { itemIDsold, listURL })
            .then(res => {
                console.log(res)
                setISPaid(true)
            })
            .catch(err => {
                setItemIDsold([])
                setListURL([])
            })
    }

    const cardStyle = {
        style: {
            base: {
                color: "#FFFFFF",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#FFFFFF"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            },
        }
    };
    if(isPaid){
        return<Redirect to='/download' />
    }else{

    return (
        <div >
                <div className='credit-cart'>
                    <p>Credit Card</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Image src={img} size='mini' />
                        <Image src={img2} size='mini' />
                    </div>

                    <CardElement id="card-element" options={cardStyle} />
                    <div className='visa'>VISA</div>
                </div>
                <Button
                    disabled={succeeded}
                    onClick={handleSubmit}
                    style={{ marginLeft: '42%', marginTop: '20px' }}
                    primary
                >
                    <span id="button-text">
                        {processing ? (
                            <Icon name='stripe s' loading={true} />
                        ) : (
                            "Pay now"
                        )}
                    </span>
                </Button>
        </div>
    );
}
}

export default StripeComponent;

