import React from 'react';
import { Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Label, Item, Header, Form, Divider, Select, Tab } from 'semantic-ui-react'

const HowToBuy = () => {
    return (
        <Container style={{ marginTop: '50px' }}>
            <Header textAlign='center' as='h1'>How do I buy something on Future House ?</Header>
            <p>In order to make a purchase on Future House, you must have an account at Future House.</p>
            <p>Ensure that you have the Future House App installed on your device or visit our website futurehouse.com to start browsing. </p>
            <p>You will need to register and set up an account to make a purchase.</p>
            <p>To start shopping on Future House, simply:</p>
            <p>1. Browse the items on the homepage.</p>
            <p>2. Search for the item you are looking for using the search bar.</p>
            <p>Once you have selected an item, you will be directed to the product page where you can click on:</p>
            <p>1. Add to Cart to save the product to your shopping cart.</p>
            <p>2. Add to Wishlist to save the product to your wishlist.</p>
                
        </Container>
    );
}

export default HowToBuy;
