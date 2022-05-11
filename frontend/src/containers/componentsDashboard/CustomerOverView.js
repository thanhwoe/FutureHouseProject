import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, TextArea, Form } from 'semantic-ui-react'
import { userListURL} from '../../constants'
import { authAxios } from "../../utils"
import CustomerDetail from './CustomerDetail';
import ReactTimeAgo from 'react-time-ago'


const CustomerOverView = () => {
    const [data, setData] = useState(null);
    const [isEdit, setIsEdit] = useState(false)
    const [idItem, setIdItem] = useState(false)

    useEffect(()=>{
        handleFetchUserList()
    },[])
    const handleFetchUserList=()=>{
        authAxios
            .get(userListURL)
            .then(res=>{
                setData(res.data)
                // console.log(res.data)
            })
            .catch(err=>{
                // console.log(err)
            })
    }

    const handleTogleEdit = (id) => {
        setIdItem(id)
        setIsEdit(!isEdit)
        // console.log(isEdit)
    }
    const handleBackList =()=>{
        setIsEdit(false)
        handleFetchUserList()
    }
   
    return (
        <React.Fragment>
            {isEdit ? (
                <CustomerDetail  id ={idItem}/>
            ) : (
        <Grid >
            <Grid.Row >
                <Grid.Column width={4}>User Name</Grid.Column>
                <Grid.Column width={4}>User Email</Grid.Column>
                <Grid.Column width={4}>Date Joined</Grid.Column>
                <Grid.Column width={4}>Last Login</Grid.Column>
                {/* <Grid.Column width={1}>Action</Grid.Column> */}
            </Grid.Row>
            {data && data.map(item=>{
                return(
                    <Grid.Row key={item.id}>
                <Grid.Column width={4} ><a onClick={()=>handleTogleEdit(item.id)} >{item.username}</a></Grid.Column>
                <Grid.Column width={4}>{item.email}</Grid.Column>
                <Grid.Column width={4}>{new Date(item.date_joined).toLocaleString()}</Grid.Column>
                <Grid.Column width={4}>
                    {item.last_login ? (<ReactTimeAgo  date={Date.parse(item.last_login)} locale="en-US" />)
                    :( <div>None</div>)}
                </Grid.Column>
                {/* <Grid.Column width={1}>Action</Grid.Column> */}
                </Grid.Row>
                )
            })}
            
        </Grid>
        )}
        {isEdit?(
                <Button onClick={handleBackList} style={{margin:'20px 20px'}}>Back</Button>
            ):<div/>}
        </React.Fragment>
    );
}

export default CustomerOverView;
