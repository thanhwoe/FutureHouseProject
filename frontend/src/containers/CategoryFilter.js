import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Card, Container, Icon, Image, Header, Loader, Dimmer, Message } from 'semantic-ui-react'
import { productListURL, addToCartURL } from '../constants';
import { authAxios } from '../utils';
import { Link, withRouter } from 'react-router-dom'

const CategoryFilter = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { match: { params } } = props

    useEffect(() => {
        handleGetProducts()
    }, []);
    const handleGetProducts = () => {
        setLoading(true)
        axios
            .get(productListURL)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => {
                setError(err)
            });
    }
    return (
        <React.Fragment>
            <Container>
                <Header as="h2" style={{ textAlign: 'center', margin: '50px 0' }}>
                    <Icon
                        name="building"
                        style={{ fontSize: "1em", display: "contents" }} /> {params.style}
                </Header>
            </Container>
            <Container style={{ display: 'flex', margin: "20px 0", flexWrap: 'wrap' }}>
                {data.filter(item => {
                    return item.category === params.style
                }).map(item => {
                    return (
                        <Link key={item.id} to={{ pathname: `/products/${item.slug}/${item.id}` }} style={{marginBottom:'30px'}}>
                            <Card className='customProdCard'>
                                <Image src={item.thumbnail} wrapped ui={true} />
                                <Card.Content>
                                    <Card.Header>{item.title}</Card.Header>
                                    <Card.Meta>
                                        <span className='cinema'>{item.category}</span>
                                    </Card.Meta>
                                    <Card.Description>{item.description}</Card.Description>
                                </Card.Content>
                            </Card>
                            </Link>
                    )

                })}
            </Container>
        </React.Fragment>
    );
}


export default withRouter((CategoryFilter))

