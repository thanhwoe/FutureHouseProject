import React from 'react';
import { Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Label, Item, Header, Form, Divider, Select, Tab } from 'semantic-ui-react'

const ContactUs = () => {
    return (
        <Container style={{ marginTop: '50px' }}>
        <Header textAlign='center' as='h1'>How can I contact Future House Customer Service?</Header>
        <p>You can contact Future House via these 3 channels:</p>
        <p>1. Chat with our Live Agents via Shopee App, by clicking on Me and Chat with Shopee, available from Monday to Sunday, 8.00AM to 2:00AM.</p>
        <p>2. Call us at +65 6206 6610 from Monday to Sunday, 8.00AM to 10:00PM, including Public Holidays.</p>
        <p>3. Drop us an email by clicking on Me, followed by Help Centre, and tapping on E-mail at the bottom of the page.</p>
    </Container>
    );
}
export default ContactUs;

