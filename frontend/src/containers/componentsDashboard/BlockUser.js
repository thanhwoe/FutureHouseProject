import React, { Component, useState, useEffect } from 'react';
import { blockUserURL } from '../../constants'
import { authAxios } from "../../utils"
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, Checkbox, Form, Divider } from 'semantic-ui-react'

const Blockuser = () => {
    const [data, setData] = useState();
    useEffect(() => {
        handleFetchUser()
    }, [])
    const handleFetchUser = () => {
        authAxios
            .get(blockUserURL)
            .then(res => {
                setData(res.data)
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handelSubmit=(id)=>{
        authAxios
            .put(blockUserURL,{id})
            .then(res => {
                // setData(res.data)
                handleFetchUser()
                // console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <Grid >
            <Grid.Row >
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={1}>User ID</Grid.Column>
                <Grid.Column width={3}>User Name</Grid.Column>
                <Grid.Column width={4}>Email</Grid.Column>
                <Grid.Column width={7}>Block</Grid.Column>
            </Grid.Row>
            {data && data.map(item => {
                return (
                    <Grid.Row key={item.id}>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={1} textAlign='center'>{item.id}</Grid.Column>
                        <Grid.Column width={3}>{item.username}</Grid.Column>
                        <Grid.Column width={4}>{item.email}</Grid.Column>
                        <Grid.Column width={7}><Checkbox checked={!item.is_active} onChange={()=>handelSubmit(item.id)} /></Grid.Column>
                    </Grid.Row>
                )
            })}

        </Grid>
    );
}

export default Blockuser;
