import React, { Component, useState, useEffect } from 'react';
import { paymentListURL, downloadURL } from '../constants'
import { authAxios } from '../utils'
import { Button, Container, Divider, Form, Item, Label, Message, Select, Header, Table } from "semantic-ui-react";
import axios from 'axios';
import QRCode from 'qrcode';
import { localhost } from '../constants'
import { connect } from 'react-redux'
import { fetchCart } from '../store/actions/cart'
import { Link, withRouter } from "react-router-dom";



class Download extends Component {

    state = {
        payments: [],
    }
    componentDidMount() {
        this.handleFetchPayMents()
        this.props.refreshCart()
    }


    handleFetchPayMents = () => {
        authAxios
            .get(paymentListURL)
            .then(res => {
                this.setState({ payments: res.data })
            })
            .catch(err => {
            })
    }
 
    handelButtonURL = (url)=>{
        // let tesst = encodeURIComponent(url).replace('http%3A%2F%2F127.0.0.1%3A8000%2F', `${localhost}/`)
        window.open(url,'_blank')
    }


    render() {
        const { payments } = this.state
        const lastItem = payments.pop()
        return (
            <Container style={{paddingTop:'30px', minHeight:'100vh'}}>
                <Header as='h2' style={{textAlign:'center'}}>Thank you for your purchase</Header>
                <Table celled>
                    <Table.Header>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Download</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {lastItem && lastItem.items.map(u => {
                            return (
                                <Table.Row key={u.id}>
                                    <Table.Cell collapsing>{u.id}</Table.Cell>
                                    <Table.Cell>{u.item.title}</Table.Cell>
                                    <Table.Cell collapsing><Button href={u.downloadUrl} >Download</Button></Table.Cell>
                                </Table.Row>
                                )
                        })}
                    </Table.Body>
                </Table>
            </Container>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshCart: () => dispatch(fetchCart())
    }
}
export default connect(null, mapDispatchToProps)(Download)

