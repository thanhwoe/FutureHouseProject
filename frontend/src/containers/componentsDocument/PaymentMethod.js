import React from 'react';
import { Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Label, Item, Header, Form, Divider, Select, Tab } from 'semantic-ui-react'
import img from '../../image/PayPal_logo.png'
import img2 from '../../image/Stripe_Logo.png'

const PaymentMethod = () => {
    return (
        <Container style={{ marginTop: '50px' }}>
            <Header textAlign='center' as='h1'>What payment options does Future House support?</Header>
            <p>Future House support two payment methods</p>
            <p>1. You can use Paypal account or credit card on Future House. </p>
            <img src={img} alt="img" width="500" height="200"/>
            <p>2. You can use credit card on Future House. </p>
            <img src={img2} alt="img" width="500" height="200"/>
        </Container>
    );
}

export default PaymentMethod;
