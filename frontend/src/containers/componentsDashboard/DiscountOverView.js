import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, TextArea, Form, Table, Label, Divider } from 'semantic-ui-react'
import { couponListURL, couponDeleteURL } from '../../constants'
import { authAxios } from "../../utils"
import ReactTimeAgo from 'react-time-ago'
import DiscountUpdate from './DiscountUpdate';


const DiscountOverView = () => {
    const [data, setData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [idItem, setIdItem] = useState(false)

    useEffect(() => {
        handleFetchCouponList()
    }, [])
    const handleFetchCouponList = () => {
        authAxios
            .get(couponListURL)
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
    }
    const handleDeleteCoupon = (id) => {
        authAxios
            .delete(couponDeleteURL(id))
            .then(res => {
                handleFetchCouponList()
            })
    }
    const handleTogleEdit = (id) => {
        setIdItem(id)
        setIsEdit(!isEdit)
        console.log(isEdit)
    }
    const handleBackList =()=>{
        setIsEdit(false)
        handleFetchCouponList()
    }
    return (
        <React.Fragment>
            {isEdit ? (
                <DiscountUpdate  id ={idItem}/>
            ) : (
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Code</Table.HeaderCell>
                            <Table.HeaderCell>Amout</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data && data.map((item, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell collapsing>{item.id}</Table.Cell>
                                    <Table.Cell>{item.code}</Table.Cell>
                                    <Table.Cell>${item.amount}</Table.Cell>
                                    <Table.Cell >

                                        <Icon name='edit' onClick={()=>handleTogleEdit(item.id)} />

                                        <Icon name='trash alternate' onClick={() => handleDeleteCoupon(item.id)} />

                                    </Table.Cell>
                                </Table.Row>)
                        })}
                    </Table.Body>
                </Table>
            )}
            {isEdit?(
                <Icon name="arrow left" size='big' onClick={handleBackList} style={{ position:"absolute",top:"60px" }}/>
            ):<div/>}
        </React.Fragment>
    );
}

export default DiscountOverView;
