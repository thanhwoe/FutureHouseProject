import React, { Component } from "react";
import { Button, Container,Table,Icon,Image, Divider, Form, Item, Label, Message, Select, Header } from "semantic-ui-react";
import { Link, Redirect, withRouter } from 'react-router-dom'
import { localhost } from "../../constants";

const OrderPreview = (props) => {
        const { data } = props
    return (
        <React.Fragment >
                {data && (
                    <Table basic='very' style={{"marginTop":"20px"}} >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Thumbnail</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Price</Table.HeaderCell>
                                <Table.HeaderCell>Remove</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data && data.order_items.map((orderItem, i) => {
                                return (
                                    <Table.Row key={i}>
                                        <Table.Cell collapsing>{i+1}</Table.Cell>
                                        <Table.Cell collapsing><Image size='small' src={orderItem.item.thumbnail} /></Table.Cell>
                                        <Table.Cell>
                                            <Link to={{ pathname: `products/${orderItem.item.slug}/${orderItem.item.id}` }}><Header as='h4'>{orderItem.item.title}</Header></Link>
                                        </Table.Cell>
                                        <Table.Cell collapsing>{orderItem.item.discount_price}$</Table.Cell>
                                        <Table.Cell collapsing>
                                        <Icon 
                                                name ='trash' 
                                                color="red" 
                                                style={{float:"right", cursor:'pointer'}} 
                                                onClick ={()=>props.removeItem(orderItem.id)}/>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>
                                    {data.coupon && (
                                        <Label >Coupon: {data.coupon.code} for {data.coupon.amount} VND</Label>
                                    )}
                                </Table.HeaderCell>
                                <Table.HeaderCell colSpan='3' textAlign='right' ><Header as='h4' style={{ 'display': 'inline' }}>Order total: </Header>{data.total} $</Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                )}
            </React.Fragment>
    )
}

export default OrderPreview;
