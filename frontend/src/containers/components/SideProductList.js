import React, { useState, useEffect } from 'react';
import { productListURL } from '../../constants';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Item,
    Visibility,
    Pagination,
    Card
} from "semantic-ui-react";
import axios from 'axios'
import { Link, withRouter, Redirect, Route } from "react-router-dom";
const SideProductList = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        handleFetchProductList()
    }, []);
    const handleFetchProductList = () => {
        axios
            .get(productListURL)
            .then(res => {
                setData(res.data)
            })
    }
    return (
        <Item.Group>
            {data.slice(0, 5).map(item => {
                return (
                    <Item key={item.id} style={{marginBottom:"40px"}}>
                        <Item.Image size='tiny' src={item.thumbnail} />
                        <Item.Content verticalAlign='middle'>
                        <Header as='h4' >
                            <Link exact to={`/products/${item.slug}/${item.id}`}> {item.title}
                                </Link>
                           </Header>
                        </Item.Content>
                    </Item>
                )
            })}
        </Item.Group>
    );
}

export default SideProductList;
