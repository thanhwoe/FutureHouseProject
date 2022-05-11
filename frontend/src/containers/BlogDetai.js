import React, { Component } from 'react';
import { postDetailBlogURL, postBlogURL, productListURL } from '../constants'
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
    Dimmer
} from "semantic-ui-react";
import { authAxios } from "../utils"
import axios from 'axios'
import { Link, withRouter, Redirect , NavLink} from "react-router-dom";
import parse from 'html-react-parser'
import { SolarSystemLoading } from 'react-loadingg';
import ReactTimeAgo from 'react-time-ago'
import { localhost } from "../constants";
import SideBlogList from './components/SideBlogList';
import SideProductList from './components/SideProductList';

class BlogDetai extends Component {
    state = {
        loading: true,
        error: null,
        data: [],
        searching: false,
    };
    componentDidMount() {
        window.scrollTo(0, 0)
        this.handleFetchItem()
        this.ifSearch()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.postID !== prevProps.match.params.postID) {
            this.handleFetchItem()
        }
    }

    handleFetchItem = () => {
        const { match: { params } } = this.props
        axios
            .get(postDetailBlogURL(params.postID))
            .then(res => {
                this.setState({ data: res.data, loading: false })

            })
            .catch(err => {
                this.setState({ error: err, loading: false })
            });

    }


    ifSearch = () => {
        const buttonSearch = document.querySelector('#buttonSearch');

        buttonSearch.addEventListener('click', event => {
            this.setState({ searching: true })
        });
    }
    render() {
        const { data, loading, searching, content, blogList } = this.state
        // console.log(prodList)
        if (searching) {
            return <Redirect to='/' />
        }
        if (loading === true) {
            return (<Dimmer active><SolarSystemLoading /></Dimmer>)
        } else {
            const param = data.content.replace("/media/uploads/", `${localhost}/media/uploads/`)
            // console.log(param)

            return (
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header as='h3' textAlign='center'>New Product</Header>
                            <Divider hidden/>
                            <SideProductList/>
                        </Grid.Column>
                        <Grid.Column width={10} style={{ paddingTop: '50px' }}>
                            <Header as='h1'>{data.title}</Header>
                            <Header as='h5' disabled>
                                <ReactTimeAgo date={Date.parse(data.timestamp)} locale="en-US" />
                                <span>&nbsp;&nbsp;</span> - <span>&nbsp;&nbsp;</span>
                                By {data.author}
                            </Header>

                            {parse(param)}


                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header as='h3' textAlign='center'>Recent Post</Header>
                            <Divider hidden/>

                            <SideBlogList />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            );
        }
    }
}



export default withRouter(BlogDetai);
