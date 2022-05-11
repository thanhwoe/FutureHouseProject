import React, { useState, useEffect } from 'react';
import { postBlogURL } from '../../constants';
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
const SideBlogList = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        handleFetchBlogList()
    }, []);
    const handleFetchBlogList = () => {
        axios
            .get(postBlogURL)
            .then(res => {
                setData(res.data)
            })
    }
    return (
        <Item.Group>
            {data.reverse().slice(0, 5).map(item => {
                return (
                    <Item key={item.id} style={{marginBottom:"40px"}}>
                        <Item.Image size='tiny' src={item.thumbnail} />
                        <Item.Content verticalAlign='middle'>
                            <Header as='h4' >
                                <Link exact to={`/post/${item.slug}/${item.id}`}  >
                                    {item.title}
                                </Link>
                            </Header>
                        </Item.Content>
                    </Item>
                )
            })}
        </Item.Group>
    );
}

export default withRouter(SideBlogList);
