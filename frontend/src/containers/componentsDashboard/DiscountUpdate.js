import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, TextArea, Form, Table, Label, Divider } from 'semantic-ui-react'
import { couponDetailURL, couponUpdateURL } from '../../constants'
import { authAxios } from "../../utils"
import ReactTimeAgo from 'react-time-ago'
import { NotificationContainer, NotificationManager } from 'react-notifications';

const DiscountUpdate = (props) => {
    const initialFormData = Object.freeze({
        code: '',
        amount: null,
    });
    const [formData, updateFormData] = useState(initialFormData);
    useEffect(() => {
        handleFetchItem()
    }, [updateFormData]);
    const handleFetchItem = () => {
        authAxios
            .get(couponDetailURL(props.id))
            .then((res) => {
                updateFormData({
                    ...formData,
                    ['code']: res.data.code,
                    ['amount']: res.data.amount,
                });
            });
    }
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        authAxios
            .put(couponUpdateURL(props.id), {
                code: formData.code,
                amount: formData.amount
            })
            .then(res=>{
                NotificationManager.success('Success message', 'Update voucher Success');
            })
    };
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={1}>

                </Grid.Column>
                <Grid.Column width={10} className="border-css">
                    <Form>
                        <p>Code</p>
                        <Input placeholder='Code' name="code" fluid onChange={handleChange} value={formData.code} />
                        <p>Amount</p>
                        <Input placeholder='Amount' name="amount" fluid onChange={handleChange} value={formData.amount} style={{marginTop:'20px'}} />
                        <Button onClick={handleSubmit} style={{backgroundColor:'#3498db', marginTop:'20px'}}>Update</Button>
                    </Form>

                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default DiscountUpdate;
