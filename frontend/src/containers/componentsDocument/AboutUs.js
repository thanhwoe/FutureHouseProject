import React, {useEffect} from 'react';
import { Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Label, Item, Header, Form, Divider, Select, Tab } from 'semantic-ui-react'

const AboutUs = () => {
    useEffect(() => {
        handleClick()
    }, []);
    const handleClick = ()=>{
        window.scrollTo(0, 0)
    }
    return (
        <React.Fragment>
            <Container style={{ marginTop: '50px' }}>
                <Header textAlign='center' as='h1'>Future House</Header>
                <p>1. Our Purpose</p>
                <p>We believe in the transformative power of technology and want to change the world for the better by providing a platform to connect buyers and sellers within one community.</p>
                <p>2. Our Positioning</p>
                <p>To Internet users across the region, Shopee offers a one-stop online shopping experience that provides a wide selection of products, a social community for exploration, and seamless fulfilment services.</p>
                <p>3. Our Personality</p>
                <p>To define who we are - how we talk, behave or react to any given situation - in essence, we are Simple, Happy and Together. These key attributes are visible at every step of the Shopee journey.</p>
                <p>4. Simple</p>
                <p>We believe in simplicity and integrity, ensuring a life that’s honest, down to earth and true to self.</p>
                <p>5. Happy</p>
                <p>We are friendly, fun-loving and bursting with heaps of energy, spreading the joy with everyone we meet.</p>
                <p>6. Together</p>
                <p>We enjoy spending quality time together while shopping online with friends and family - doing the things we love as one big unit.</p>
            </Container>

        </React.Fragment>

    );
}

export default AboutUs;

