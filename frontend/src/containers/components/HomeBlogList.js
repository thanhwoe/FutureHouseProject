import React, { Component } from 'react';
import { postBlogURL } from '../../constants'
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
import { authAxios } from "../../utils"
import axios from 'axios'
import { Link, withRouter } from "react-router-dom";
import { SolarSystemLoading } from 'react-loadingg';

class HomeBlogList extends Component {
    state = {
        content: null,
        loading: true
    }
    componentDidMount() {
        this.handleFetchBlogList()
    }
    handleFetchBlogList = () => {
        axios
            .get(postBlogURL)
            .then(res => {
                this.setState({ content: res.data, loading: false })
            })
    }
    render() {
        const { content, loading } = this.state
        // console.log(content)
        if (loading) {
            return (<Container style={{ height: "80vh" }}><SolarSystemLoading /></Container>)
        } else {

            return (
                <React.Fragment>
                    <Container>
                        <Header as="h2" style={{ textAlign: 'center', marginBottom: '50px', marginTop: '100px' }}>
                            <Icon
                                name="newspaper"
                                style={{ fontSize: "1em", display: "contents" }} /> New Post
                        </Header>
                    </Container>
                    <Container>
                        <Grid columns={3} divided>
                            <Grid.Row>
                                {content && content.slice(0, 3).map((item) => {
                                    return (
                                        <Grid.Column key={item.id}>
                                            <Link to={{ pathname: `post/${item.slug}/${item.id}` }}>
                                                <Item.Group>
                                                    <Item>
                                                        <Item.Image size='tiny' circular src={item.thumbnail} />
                                                        <Item.Content>
                                                            <Item.Header as='a'>{item.title}</Item.Header>
                                                            <Item.Description>
                                                                {item.overview}
                                                            </Item.Description>
                                                        </Item.Content>
                                                    </Item>

                                                </Item.Group>
                                            </Link>
                                        </Grid.Column>
                                    )
                                })}
                            </Grid.Row>
                            <Divider hidden/>
                            <Grid.Row>
                                {content && content.slice(3, 5).map(item => {
                                    return (
                                        <Grid.Column key={item.id}>
                                            <Link to={{ pathname: `post/${item.slug}/${item.id}` }}>
                                                <Item.Group>
                                                    <Item>
                                                        <Item.Image size='tiny' circular src={item.thumbnail} />

                                                        <Item.Content>
                                                            <Item.Header as='a'>{item.title}</Item.Header>
                                                            <Item.Description>
                                                                {item.overview}
                                                            </Item.Description>
                                                        </Item.Content>
                                                    </Item>
                                                </Item.Group>
                                            </Link>
                                        </Grid.Column>
                                    )
                                })}
                            </Grid.Row>
                        </Grid>
                    </Container>
                    <Container style={{ margin: "10px 0 50px" }}><Link to='/blogs-list' style={{ float: 'right' }}>More...</Link></Container>

                </React.Fragment>

            );
        }

    }
}

export default HomeBlogList;
