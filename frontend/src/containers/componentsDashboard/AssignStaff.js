import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, Checkbox, Form, Divider } from 'semantic-ui-react'
import { userProfileURL } from '../../constants'
import { authAxios } from "../../utils"
const AssignStaff = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        handleFetchUserProfile()
    }, [])
    const handleFetchUserProfile = () => {
        authAxios
            .get(userProfileURL)
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handelSubmit=(id)=>{
        authAxios
            .put(userProfileURL,{id})
            .then(res => {
                // setData(res.data)
                handleFetchUserProfile()
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
                <Grid.Column width={7}>User Name</Grid.Column>
                <Grid.Column width={7}>Assign Staff</Grid.Column>
            </Grid.Row>
            {data && data.map(item => {
                return (
                    <Grid.Row key={item.id}>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={1} textAlign='center'>{item.id}</Grid.Column>
                        <Grid.Column width={7}>{item.user}</Grid.Column>
                        <Grid.Column width={7}><Checkbox checked={item.isStaff} onChange={()=>handelSubmit(item.id)} /></Grid.Column>
                    </Grid.Row>
                )
            })}

        </Grid>
    );
}

export default AssignStaff;
