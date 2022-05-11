import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, TextArea, Form, Table, Label, Divider } from 'semantic-ui-react'
import { couponCreateURL, couponDeleteURL } from '../../constants'
import { authAxios } from "../../utils"
import ReactTimeAgo from 'react-time-ago'
import { NotificationContainer, NotificationManager } from 'react-notifications';

const DiscountCreate = () => {
    const history = useHistory();

    const initialFormData = Object.freeze({
        code: '',
        amount: null,
    });
    const [formData, updateFormData] = useState(initialFormData);
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)
        let DataForm = new FormData();
        DataForm.append('code', formData.code)
        DataForm.append('amount', formData.amount)
        authAxios
            .post(couponCreateURL, DataForm)
            .then((res) => {
                // history.push('/dashboard');
                NotificationManager.success('Success message', 'Create voucher Success');

                // console.log(res)
            })
            .catch(err => {
                console.log(err)
            });
    };
    return (
        <Form>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}/>
                    <Grid.Column width={6} className="border-css">
                        <Header>Create Coupon</Header>
                        <Input placeholder='Code' name="code" fluid onChange={handleChange} />
                        <br/>
                        <Input placeholder='Amount' name="amount" fluid onChange={handleChange} />
                        <br/>
                        <Button onClick={handleSubmit} style={{backgroundColor:'#3498db', marginTop:'10px'}}>Create</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>
    );
}

export default DiscountCreate;
