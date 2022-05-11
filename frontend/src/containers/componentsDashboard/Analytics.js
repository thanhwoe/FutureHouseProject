import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Item, Message, Grid, Input, TextArea, Form, Table, Label, Divider } from 'semantic-ui-react'
import { analyzePaymentURL, analyzeOrderURL,analyzeUserURL } from '../../constants'
import { authAxios } from "../../utils"
import LineCharts from './LineChart';

const Analytics = () => {

    const [order, setOrder] = useState([])
    const [payment, setPayment] = useState([])
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        handleFetchPayment()
        handleFetchOrder()
        handleFetchUser()
    }, []);

    const handleFetchPayment = () => {
        authAxios
            .get(analyzePaymentURL)
            .then(res => {
                let DataP = res.data
                DataP.sort(function(a, b) { 
                    return a.timestamp__month - b.timestamp__month;
                });
                setPayment(DataP)
            })
    }
    const handleFetchUser = () => {
        authAxios
            .get(analyzeUserURL)
            .then(res => {
                let DataU = res.data
                DataU.sort(function(a, b) { 
                    return a.date_joined__month - b.date_joined__month;
                });
                setUser(DataU)
            })
    }
    const handleFetchOrder = () => {
        authAxios
            .get(analyzeOrderURL)
            .then(res => {
                // res.data.filter(item => {
                //     return item.start_date__year === 2021
                // }).map(item => {
                //     let index = item.start_date__month - 1
                //     let countData = item.count
                //     let newObject = [...order]
                //     newObject[index] = countData
                //     newObject[2] = 10
                //     setOrder(newObject)
                // })
                let DataO = res.data
                DataO.sort(function(a, b) { 
                    return a.start_date__month - b.start_date__month;
                });
                setOrder(DataO)

            })

    }

    return (
        <Container>
            <Header as="h2" style={{ textAlign: 'left', margin: '50px 0' }}>
                Order Analysis Chart
            </Header>
            <LineCharts data={order} keyY='start_date__month'/>
            <Header as="h2" style={{ textAlign: 'left', margin: '50px 0' }}>
                Payment Analysis Chart
            </Header>
            <LineCharts data={payment} keyY='timestamp__month' />
            <Header as="h2" style={{ textAlign: 'left', margin: '50px 0' }}>
                New User Join Analysis Chart
            </Header>
            <LineCharts data={user} keyY='date_joined__month' />
        </Container>
    );
}

export default Analytics;
