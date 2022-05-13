import React, { useState, useEffect } from 'react'
import { Divider, Grid, Header, Menu, Input, Message, Select, Card, Label, Button, Table, Image, Icon, Form } from 'semantic-ui-react'
import { wishlistURL, userIDURL, userUpdateURL, paymentListURL, orderSummaryURL, orderItemDeleteURL } from '../../constants'
import { authAxios } from '../../utils'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { localhost } from '../../constants'
import { fetchCart } from '../../store/actions/cart'
import { NotificationContainer, NotificationManager } from 'react-notifications';


class OrderList extends React.Component {
    state = {
        data: null,
        error: null
    }
    componentDidMount() {
        this.handleFetchOrder()
    }
    handleFetchOrder = () => {
        authAxios
            .get(orderSummaryURL)
            .then(res => {

                this.setState({ data: res.data })
            })
            .catch(err => {
                this.setState({ error: "Dont have order" })
                console.log(JSON.stringify(err))
            });
    }
    handleRemoveItem = itemID => {
        authAxios
            .delete(orderItemDeleteURL(itemID))
            .then(res => {
                this.handleFetchOrder()
                this.props.refreshCart();
                NotificationManager.success('Success message', 'Product has been removed from your order');


            })
            .catch(err => {
                this.setState({ error: err })
            });
    }
    render() {
        const { data } = this.state
        // console.log(localhost)
        return (
            <React.Fragment>
                {data && (
                    <Table celled >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Thumbnail</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Price</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data && data.order_items.map((orderItem, i) => {
                                return (
                                    <Table.Row key={i}>
                                        <Table.Cell collapsing>{i + 1}</Table.Cell>
                                        <Table.Cell collapsing><Image size='tiny' src={`${orderItem.item.thumbnail}`} /></Table.Cell>
                                        <Table.Cell>
                                            <Link to={{ pathname: `products/${orderItem.item.slug}/${orderItem.item.id}` }}>{orderItem.item.title}</Link>
                                            <Icon
                                                name='trash'
                                                color="red"
                                                style={{ float: "right", cursor: 'pointer' }}
                                                onClick={() => this.handleRemoveItem(orderItem.id)} />
                                        </Table.Cell>
                                        <Table.Cell collapsing>{orderItem.item.discount_price}$</Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'><Header as='h4' style={{ 'display': 'inline' }}>Order total: </Header>{data.total} $</Table.HeaderCell>
                                <Table.HeaderCell colSpan='2' textAlign='right'>
                                    {data.coupon && (
                                        <Label >Coupon: {data.coupon.code} for {data.coupon.amount} VND</Label>
                                    )}
                                    <Link to="/checkout">
                                        <Button color='grey' >Checkout</Button>
                                    </Link>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>

                    </Table>
                )}
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        refreshCart: () => dispatch(fetchCart())
    }
}
export default connect(null, mapDispatchToProps)(OrderList)
