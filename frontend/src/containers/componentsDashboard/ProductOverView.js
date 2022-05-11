import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Header, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Divider } from 'semantic-ui-react'
import { productListURL, productDeleteURL } from '../../constants'
import { authAxios } from "../../utils"
import { Link, withRouter, Redirect } from "react-router-dom";
import ProductUpdate from './ProductUpdate';
import InfiniteScroll from 'react-infinite-scroll-component';
import { localhost } from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const ProductOverView = () => {
    const [data, setData] = useState([]);
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
                    `${localhost}/api/products-list-inf/?limit=${limit}&offset=${offset}`
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
    // sort data
    data.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));

    const handleFetchItemList = () => {
        axios
            .get(productListURL)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
            });
    }

    const handleDeleteProduct = (id) => {
        authAxios
            .delete(productDeleteURL(id))
            .then(res => {
            // handleFetchItemList()
            NotificationManager.success('Success message', 'Delete Success');

            loadData()
            })
        
    }
    const handleTogleEdit = (id) => {
        setIdItem(id)
        setIsEdit(!isEdit)
        // console.log(isEdit)
    }
    const handleBackList = () => {
        setIsEdit(false)
        loadData()

    }

    return (
        <React.Fragment>
            {isEdit ? (
                <ProductUpdate id={idItem} />
            ) : (
                <Grid >
                    <Grid.Row >
                        <Grid.Column width={1}>ID</Grid.Column>
                        <Grid.Column width={6}>Name</Grid.Column>
                        <Grid.Column width={3}>Label</Grid.Column>
                        <Grid.Column width={3}>Category</Grid.Column>
                        <Grid.Column width={2}>Price</Grid.Column>
                        <Grid.Column width={1}>Action</Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <InfiniteScroll
                        dataLength={data.length} //This is important field to render the next data
                        next={() => loadData()}
                        hasMore={hasMore}
                        className="ui grid"
                    >
                        {data.map(item => {
                            return (
                                <Grid.Row key={item.id}>
                                    <Grid.Column width={1}>{item.id}</Grid.Column>
                                    <Grid.Column width={6}><Image src={item.thumbnail} size="tiny" wrapped ui={true} /> {item.title}</Grid.Column>
                                    <Grid.Column width={3}>{item.label}</Grid.Column>
                                    <Grid.Column width={3}>{item.category}</Grid.Column>
                                    <Grid.Column width={2}>${item.discount_price}</Grid.Column>
                                    <Grid.Column width={1}>
                                        <Icon name='edit' onClick={() => handleTogleEdit(item.id)} />
                                        <Icon name='trash alternate' onClick={() => handleDeleteProduct(item.id)} />
                                    </Grid.Column>

                                </Grid.Row>
                            )
                        })}
                    </InfiniteScroll>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            {loading && <Loader active inline size='large' />}
                            {!hasMore && <Header>No more products</Header>}
                        </Grid.Column>
                    </Grid.Row>

                </Grid>)}
            {isEdit ? (
                <Icon name="arrow left" size='big' onClick={handleBackList} style={{ position:"absolute",top:"60px" }}/>
            ) : <div />}
        </React.Fragment>

    );
}

export default ProductOverView;
