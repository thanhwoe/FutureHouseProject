import React, { useState, useEffect } from 'react'
import { Divider, Grid, Header, Menu, Input, Message, Select, Card, Label, Button, Table, Image, Icon, Form } from 'semantic-ui-react'
import { wishlistURL, userIDURL, userUpdateURL, paymentListURL, orderSummaryURL, orderItemDeleteURL } from '../../constants'
import { authAxios } from '../../utils'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { localhost } from '../../constants'
import QRCode from 'qrcode';

class PaymentHistory extends React.Component {
    state = {
        payments: [],
        loading: true,
        error: null,
        qrCodeUrl: ''
    }
    componentDidMount() {
        this.handleFetchPayMents()


    }

    handleFetchPayMents = () => {
        this.setState({ loading: true })
        authAxios
            .get(paymentListURL)
            .then(res => {
                this.setState({ loading: false, payments: res.data })
            })
            .catch(err => {
                this.setState({ error: err, loading: false })
            })
    }

    handleGenerateQrCode = async (url) => {
        try {
            const response = await QRCode.toDataURL(url);
            this.setState({ qrCodeUrl: response });
        } catch (error) {
            console.log(error);
        }
    }

    handelButtonURL = (url) => {
        let tesst = encodeURIComponent(url).replace('http%3A%2F%2F127.0.0.1%3A8000%2F', `${localhost}/`)
        window.open(tesst, '_blank')
    }
    render() {
        const { payments, qrCodeUrl } = this.state

        return (
            <React.Fragment>
                {payments.map(p => {
                    return (
                        <Table celled key={p.id}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>Thumbnail</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                    <Table.HeaderCell>Download</Table.HeaderCell>
                                    <Table.HeaderCell>QR Code</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {p.items.map(pItem => {
                                    return (
                                        <Table.Row key={pItem.id}>
                                            <Table.Cell collapsing>{pItem.id}</Table.Cell>
                                            <Table.Cell collapsing><Image size='tiny' src={pItem.item.thumbnail} /></Table.Cell>
                                            <Table.Cell><Link to={{ pathname: `products/${pItem.item.slug}/${pItem.item.id}` }}>{pItem.item.title}</Link> </Table.Cell>
                                            <Table.Cell collapsing>{pItem.item.discount_price}$</Table.Cell>
                                            <Table.Cell collapsing><Button href={pItem.downloadUrl} >Download</Button></Table.Cell>
                                            <Table.Cell collapsing><Button onClick={() => this.handleGenerateQrCode(pItem.downloadUrl)} >Generate</Button></Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='4'><Header as='h4' style={{ 'display': 'inline' }}>Date: </Header>{new Date(p.timestamp).toLocaleString()} </Table.HeaderCell>
                                    <Table.HeaderCell colSpan='2'><Header as='h4' style={{ 'display': 'inline' }}>Total: </Header>${p.amount}</Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    )
                })}
                {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="img" className='QRCode' />
                ) : null}
            </React.Fragment>

        )
    }
}

export default PaymentHistory;
