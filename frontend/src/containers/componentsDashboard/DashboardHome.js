import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Item, Message, Grid, Input, TextArea, Form, Table, Label, Divider } from 'semantic-ui-react'
import { postBlogURL, orderListURL, productTopListURL,salePerDayURL } from '../../constants'
import { authAxios } from "../../utils"
import ReactTimeAgo from 'react-time-ago'
import ArticleUpdate from './ArticleUpdate';

const DashboardHome = () => {
    const [totalSale, setTotalSale] = useState()
    const [totalOrderPaid, setTotalOrderPaid] = useState()
    const [totalOrderRaw, setTotalOrderRaw] = useState()
    const [dataOrder, setDataOrder] = useState()
    const [dataProd, setDataProd] = useState()
    const [todaySale, setTodaySale] = useState(0)
    useEffect(() => {
        handleFetchOrderList()
        handleFetchProductList()
        handleFetchSaleDay()
    }, [])
    const handleFetchOrderList = () => {
        authAxios
            .get(orderListURL)
            .then(res => {
                const dataOrder = res.data
                dataOrder.sort(function(a, b) { 
                    return a.id - b.id;
                });
                // console.log(dataOrder)

                let total = 0
                let orderRaw = 0
                let orderPaid = 0
                for (let index = 0; index < dataOrder.length; index++) {
                    if (dataOrder[index].ordered == true) {
                        const element = dataOrder[index].total;
                        total += element
                        orderPaid += 1
                    } else {
                        orderRaw += 1
                    }
                }
                setDataOrder(dataOrder)
                setTotalSale(total)
                setTotalOrderPaid(orderPaid)
                setTotalOrderRaw(orderRaw)
            })
    }

    const handleFetchProductList = () => {
        axios
            .get(productTopListURL)
            .then(res => {
                setDataProd(res.data)
                // console.log(res.data)
            })
            .catch(err => {
            });
    }

    const handleFetchSaleDay = ()=>{
        axios
        .get(salePerDayURL)
        .then(res=>{
            let dataToday = res.data
            let total = 0
            for (let index = 0; index < dataToday.length; index++) {
                const element = dataToday[index].total;
                total += element
            }
            setTodaySale(total)
        })
    }
    const items = [
        {
            header: 'Total Sales',
            description: `$${totalSale}`,
            meta: 'All time',
        },
        {
            header: 'Total Sales',
            description: `$${todaySale}`,
            meta: 'Today',
        },
        {
            header: 'Orders Paid',
            description: `${totalOrderPaid} order`,
            meta: 'All time',
        },
        {
            header: 'Orders In Cart',
            description: `${totalOrderRaw} order`,
            meta: 'All time',
        },
    ]
    return (
        <React.Fragment>
            <Grid columns={2} divided>
                <Grid.Row stretched>
                    <Grid.Column width={10} >
                        <Segment textAlign='center' style={{paddingLeft:'10%'}}>
                            <Card.Group items={items} className='analyCart' />
                        </Segment>
                        <Segment >
                            <Header as='h1' textAlign='center'>Top Product</Header>
                            <Grid >
                                <Grid.Row >
                                    <Grid.Column width={10} >Product Name</Grid.Column>
                                    <Grid.Column width={3}>Product Price</Grid.Column>
                                    <Grid.Column width={3}>Sold</Grid.Column>
                                </Grid.Row>
                                <Divider />
                                {dataProd && dataProd.slice(0, 5).map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid.Row key={index}>
                                                <Grid.Column width={10} style={{ 'display': 'flex', 'alignItems': 'center' }}><Image src={item.thumbnail} size="tiny" style={{ 'marginRight': "35px" }} wrapped />
                                                    <div>
                                                        <h4>{item.title}</h4>
                                                        <p>{item.category}</p>
                                                        <p>{item.label}</p>
                                                    </div>
                                                </Grid.Column>
                                                <Grid.Column width={3}>${item.discount_price}</Grid.Column>
                                                <Grid.Column width={3}>{item.count_sell}</Grid.Column>
                                            </Grid.Row>
                                            <Divider />
                                        </React.Fragment>
                                    )
                                })}

                            </Grid>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column className="border-css" width={3}>
                        <Segment>
                            <Header>Activity</Header>
                            <Divider />
                            <Item.Group>
                                {dataOrder && dataOrder.reverse().slice(0, 10).map((item, index) => {
                                    return (
                                        <Item key={index}>
                                            <Item.Content>
                                                {/* <Item.Header as='a'>Header</Item.Header> */}
                                                {/* <Item.Meta>Description</Item.Meta> */}
                                                <Item.Description style={{ 'display': 'flex' }}>
                                                    Order #{item.id} &nbsp;
                                                    {item.ordered == true ? (
                                                        <p>was fully paid</p>
                                                    ) : (<p>was placed</p>)}
                                                </Item.Description>
                                                <Item.Extra><ReactTimeAgo date={Date.parse(item.ordered_date)} locale="en-US" /></Item.Extra>
                                            </Item.Content>
                                        </Item>)
                                })}

                            </Item.Group>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </React.Fragment>
    );
}

export default DashboardHome;
