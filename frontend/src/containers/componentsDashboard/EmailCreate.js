import React, { Component, useState, useEffect } from 'react';
import { useHistory, useParams, Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios'
import { Header, Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Input, TextArea, Form, Table, Label, Divider } from 'semantic-ui-react'
import { emailSendURL, userIDURL } from '../../constants'
import { authAxios } from "../../utils"
import { NotificationContainer, NotificationManager } from 'react-notifications';

// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

const EmailCreate = () => {
    const initialFormData = Object.freeze({
        subject: '',
        email: '',
        content: '',
    });
    // const [userId, setUserId] = useState(null);
    
    const [formData, updateFormData] = useState(initialFormData);
    const [sending, setSending] = useState(false);

    // useEffect(() => {
    //     authAxios
    //         .get(userIDURL)
    //         .then(res => {
    //             setUserId(res.data.userID)
    //         })

    // }, [])


    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true)
        let DataForm = new FormData();
        DataForm.append('subject', formData.subject)
        DataForm.append('email', formData.email)
        DataForm.append('content', formData.content)
        authAxios
            .post(emailSendURL, DataForm)
            .then((res) => {
                setSending(false)
                NotificationManager.success('Success message', 'Send email success');

                alert("send email success")
                document.getElementById("mail-form").reset();
            })
            .catch(err => {
                NotificationManager.error('Error message', 'Something wrong');
            });
    };
    return (
        <Container>
            <Form id='mail-form'>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Input name='subject' placeholder='Subject' onChange={handleChange} fluid />
                            <br/>
                            <TextArea placeholder='Content' name="content" onChange={handleChange}  style={{'height':'500px'}}/>
                            <Divider hidden/>
                            <Input placeholder='Email' type="email" name="email" onChange={handleChange} fluid />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid.Row>
                    <Grid.Column>
                        <br/>
                    <Button onClick={handleSubmit}>Send</Button>
                    {sending?(<Icon loading name='spinner' />):(<Icon name='mail' />)}
                    </Grid.Column>
                </Grid.Row>
            </Form>

        </Container>
    );
}

export default EmailCreate;
