import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, TextArea, Form, Table, Label, Divider } from 'semantic-ui-react'
import { postBlogURL, postDeleteURL } from '../../constants'
import { authAxios } from "../../utils"
import ReactTimeAgo from 'react-time-ago'
import ArticleUpdate from './ArticleUpdate';
import InfiniteScroll from 'react-infinite-scroll-component';
import { localhost } from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const ArticleOverView = () => {
    const [data, setData] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [idItem, setIdItem] = useState(false)
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(5)
    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        setLoading(true)

        setTimeout(() => {

            axios
                .get(
                    `${localhost}/api/blogs-list-inf/?limit=${limit}&offset=${offset}`
                )
                .then(res => {
                    const newData = res.data.data
                    const hasMore = res.data.has_more
                    setHasMore(hasMore)
                    setOffset(offset + limit)
                    setLoading(false)
                    setData([...data, ...newData])

                })
                .catch(err => {

                })
        }, 1500);
    }

    const handleFetchPosts = () => {
        axios
            .get(postBlogURL)
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
    }
    const handleDeletePost = (id) => {
        authAxios
            .delete(postDeleteURL(id))
            .then(res => {
                NotificationManager.success('Success message', 'Delete Success');
                loadData()
            })
    }
    const handleTogleEdit = (id) => {
        setIdItem(id)
        setIsEdit(!isEdit)
    }
    const handleBackList = () => {
        setIsEdit(false)
        // handleFetchPosts()
        loadData()
    }

    return (
        <React.Fragment>
            {isEdit ? (
                <ArticleUpdate id={idItem} />
            ) : (
                <Grid >
                    <Grid.Row >
                        <Grid.Column width={1}>ID</Grid.Column>
                        <Grid.Column width={9}>Title</Grid.Column>
                        <Grid.Column width={2}>Author</Grid.Column>
                        <Grid.Column width={2}>Date</Grid.Column>
                        <Grid.Column width={1}>Action</Grid.Column>
                    </Grid.Row>
                    <InfiniteScroll
                        dataLength={data.length}
                        next={() => loadData()}
                        hasMore={hasMore}
                        className="ui grid"
                    >
                        {data && data.map(item => {
                            return (
                                <Grid.Row key={item.id}>
                                    <Grid.Column width={1}>{item.id}</Grid.Column>
                                    <Grid.Column width={9}><Link to={{ pathname: `post/${item.slug}/${item.id}` }}>{item.title}</Link></Grid.Column>
                                    <Grid.Column width={2}>{item.author}</Grid.Column>
                                    <Grid.Column width={2}>{new Date(item.timestamp).toLocaleString()}</Grid.Column>
                                    <Grid.Column width={1}>
                                        <Icon name='edit' onClick={() => handleTogleEdit(item.id)} />
                                        <Icon name='trash alternate' onClick={() => handleDeletePost(item.id)} />
                                    </Grid.Column>
                                </Grid.Row>
                            )
                        })}
                    </InfiniteScroll>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            {loading && <Loader active inline size='large' />}
                            {!hasMore && <Header>No more articles</Header>}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>)}
            {isEdit ? (
                <Icon name="arrow left" size='big' onClick={handleBackList} style={{ position:"absolute",top:"60px" }}/>
            ) : <div />}
        </React.Fragment>

    );
}

export default ArticleOverView;
