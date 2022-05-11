import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Item, Card, Container, Icon, Image, Table, Loader, Dimmer, Message, Grid, Input, TextArea, Form, Divider } from 'semantic-ui-react'
import { userDetailURL, userUpdateURL, userOrderURL, userPaymentURL,emailConfirmURL } from '../../constants'
import { authAxios } from "../../utils"
import ReactTimeAgo from 'react-time-ago'
import { localhost } from '../../constants';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const CustomerDetail = (props) => {
    const initialFormData = Object.freeze({
        username: '',
        groups: null,
        first_name: '',
        last_name: '',
        email: ''
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [orderUser, setOrderUser] = useState(null)
    const [paymentUser, setPaymentUser] = useState(null)
    useEffect(() => {
        handleFetchItem()
        handleFetchOrder()
        handleFetchPayment()
    }, [updateFormData]);
    const handleFetchItem = () => {
        authAxios
            .get(userDetailURL(props.id))
            .then((res) => {
                updateFormData({
                    ...formData,
                    ['username']: res.data.username,
                    ['groups']: res.data.groups,
                    ['first_name']: res.data.first_name,
                    ['last_name']: res.data.last_name,
                    ['email']: res.data.email,
                });
            });
    }
    const handleFetchOrder = () => {
        authAxios
            .get(userOrderURL(props.id))
            .then(res => {
                setOrderUser(res.data)
            })
    }
    const handleFetchPayment = () => {
        authAxios
            .get(userPaymentURL(props.id))
            .then(res => {
                setPaymentUser(res.data)
                console.log(res.data)
            })
    }
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)

        let DataForm = new FormData();
        DataForm.append('first_name', formData.first_name)
        DataForm.append('last_name', formData.last_name)
        DataForm.append('email', formData.email)
        authAxios
            .put(userUpdateURL(props.id), DataForm)
            .then(res=>{
                handleMailConfirm()
                NotificationManager.success('Success message', 'Update Success');

            })
        // history.push({
        // 	pathname: '/admin/',
        // });
        // window.location.reload();
    };
    const handleMailConfirm =()=>{
        authAxios
            .post(emailConfirmURL, {
                Userid: props.id,
            })
            .then(res=>{
                
            })
    }
    return (
        <Form>
            <Grid container>
                <Grid.Row columns={1}>
                    <Grid.Column>
                    {/* <Button onClick={handleMailConfirm}>Tests</Button> */}

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column >
                        <Header>Username: {formData.username} &nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;ID: {props.id}</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={12} className="border-css">
                        <Header>Personal Infomation</Header>
                        <p>First Name</p>
                        <Input placeholder='First Name' name="first_name" fluid onChange={handleChange} value={formData.first_name} />
                        <br/>
                        <p>Last Name</p>
                        <Input placeholder='Last Name' name="last_name" fluid onChange={handleChange} value={formData.last_name} />
                        <Header>Contact</Header>
                        <Input placeholder='E-mail' name="email" fluid onChange={handleChange} value={formData.email} />
                        <Header>Group Permission</Header>
                        {formData.groups && formData.groups.length > 0 ? (
                            <div>
                                {formData.groups.map((item, i) => {
                                    return (
                                        <p key={i}>{item}</p>

                                    )
                                })}
                            </div>
                        ) : (
                            <div>
                                Not have permission
                            </div>
                        )}
                        <Button onClick={handleSubmit} style={{backgroundColor:'#3498db', marginTop:'10px'}}>Update</Button>

                    </Grid.Column>
                    <Grid.Column width={4} className="border-css">
                        <Header>Item in cart</Header>
                        <div>
                            {orderUser && orderUser.filter(item => {
                                return item.ordered == false
                            }).map(order => {
                                return (
                                    <Item.Group key={order.id} divided>
                                        {order.order_items.map(item => {
                                            return (
                                                <Item key={item.id} >
                                                    <Item.Content>
                                                        <Item.Header >{item.item.title}</Item.Header>
                                                        <Item.Meta>Price: ${item.item.discount_price}</Item.Meta>
                                                        <Item.Extra>{item.item.description}</Item.Extra>
                                                    </Item.Content>
                                                </Item>
                                            )
                                        })}
                                        <Divider />
                                        <Header>
                                            Total: ${order.total}
                                            <Header.Subheader>
                                            <ReactTimeAgo date={order.ordered_date} locale="en-US" />
                                            </Header.Subheader>
                                        </Header>
                                    </Item.Group>

                                )
                            })}
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={12} className="border-css">
                        <Header> Payment</Header>
                        {paymentUser && paymentUser.map(p => {
                    return (
                        <Table singleLine key={p.id}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>Thumbnail</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {p.items.map(pItem => {
                                    return (
                                        <Table.Row key={pItem.id}>
                                            <Table.Cell collapsing>{pItem.id}</Table.Cell>
                                            <Table.Cell collapsing><Image size='tiny' src={`${localhost}${pItem.item.thumbnail}`} /></Table.Cell>
                                            <Table.Cell><Link to={{ pathname: `products/${pItem.item.id}` }}>{pItem.item.title}</Link> </Table.Cell>
                                            <Table.Cell collapsing>{pItem.item.discount_price}$</Table.Cell>
                                            {/* <Table.Cell collapsing><Button to={pItem.downloadUrl}>Download</Button></Table.Cell> */}
                                        </Table.Row>
                                    )
                                })}


                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='3'><Header as='h4' style={{ 'display': 'inline' }}>Date: </Header>{new Date(p.timestamp).toLocaleString()} </Table.HeaderCell>
                                    <Table.HeaderCell colSpan='2'><Header as='h4' style={{ 'display': 'inline' }}>Total: </Header>{p.amount}$</Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    )
                })}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>

    );
}

export default CustomerDetail;
