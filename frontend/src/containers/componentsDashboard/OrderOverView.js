import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, TextArea, Form, Table, Label, Divider } from 'semantic-ui-react'
import { orderListURL } from '../../constants'
import { authAxios } from "../../utils"
import ReactTimeAgo from 'react-time-ago'
import InfiniteScroll from 'react-infinite-scroll-component';
import { localhost } from '../../constants';

const OrderOverView = () => {
    const [data, setData] = useState([])

    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(2)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        setLoading(true)
        setTimeout(() => {
            authAxios
                .get(
                    `${localhost}/api/order-list-inf/?limit=${limit}&offset=${offset}`
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

    const handleFetchOrderList = () => {
        authAxios
            .get(orderListURL)
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
    }
    return (
        <Grid container>
            <Grid.Row columns={1}>
                <Grid.Column>

                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column className="border-css" width={7} floated='left'>
                    <Header>Unpaid orders </Header>
                    <InfiniteScroll
                        dataLength={data.length} //This is important field to render the next data
                        next={() => loadData()}
                        hasMore={hasMore}
                    >
                        {data && data.filter(item => {
                            return item.ordered == false
                        }).map(order => {
                            return (
                                <React.Fragment key={order.id}>
                                    <Message error >
                                        <Header>#{order.id}</Header>
                                        User: {order.user}
                                        <br />
                                        Date: {new Date(order.ordered_date).toLocaleString()}
                                    </Message>
                                    <Table singleLine key={order.id}>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>ID</Table.HeaderCell>
                                                <Table.HeaderCell>Product Name</Table.HeaderCell>
                                                <Table.HeaderCell>Price</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {order.order_items.map(pItem => {
                                                return (
                                                    <Table.Row key={pItem.id}>
                                                        <Table.Cell collapsing>{pItem.id}</Table.Cell>
                                                        <Table.Cell><Link to={{ pathname: `products/${pItem.item.id}` }}>{pItem.item.title}</Link> </Table.Cell>
                                                        <Table.Cell >{pItem.item.discount_price}$</Table.Cell>
                                                    </Table.Row>
                                                )
                                            })}
                                        </Table.Body>
                                        <Table.Footer>
                                            <Table.Row>
                                                <Table.HeaderCell colSpan='3'><Header as='h4' style={{ 'display': 'inline' }}>Order total: $</Header>{order.total}
                                                    {order.coupon && (
                                                        <Label >Coupon: {order.coupon.code} for ${order.coupon.amount}</Label>
                                                    )}
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Footer>
                                    </Table>
                                    <Divider />

                                </React.Fragment>
                            )
                        })}
                    </InfiniteScroll>
                </Grid.Column>
                <Grid.Column className="border-css" width={7} floated='right'>
                    <Header>Order has been paid </Header>
                    <InfiniteScroll
                        dataLength={data.length} //This is important field to render the next data
                        next={() => loadData()}
                        hasMore={hasMore}
                    >
                        {data && data.filter(item => {
                            return item.ordered == true
                        }).map(order => {
                            return (
                                <React.Fragment key={order.id}>
                                    <Message success >
                                        <Header>#{order.id}</Header>
                                        User: {order.user}
                                        <br />
                                        Date: {new Date(order.ordered_date).toLocaleString()}
                                    </Message>
                                    <Table singleLine key={order.id}>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>ID</Table.HeaderCell>
                                                <Table.HeaderCell>Product Name</Table.HeaderCell>
                                                <Table.HeaderCell>Price</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {order.order_items.map(pItem => {
                                                return (
                                                    <Table.Row key={pItem.id}>
                                                        <Table.Cell collapsing>{pItem.id}</Table.Cell>
                                                        <Table.Cell><Link to={{ pathname: `products/${pItem.item.id}` }}>{pItem.item.title}</Link> </Table.Cell>
                                                        <Table.Cell >{pItem.item.discount_price}$</Table.Cell>
                                                    </Table.Row>
                                                )
                                            })}


                                        </Table.Body>
                                        <Table.Footer>
                                            <Table.Row>
                                                <Table.HeaderCell colSpan='3'><Header as='h4' style={{ 'display': 'inline' }}>Order total: $</Header>{order.total}
                                                    {order.coupon && (
                                                        <Label >Coupon: {order.coupon.code} for ${order.coupon.amount}</Label>
                                                    )}
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Footer>
                                    </Table>
                                    <Divider />

                                </React.Fragment>
                            )
                        })}
                    </InfiniteScroll>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column textAlign='center'>
                    {loading && <Loader active inline size='large' />}
                    {!hasMore && <Header>No more results</Header>}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default OrderOverView;
