import React, { useState, useEffect } from 'react'
import { Divider, Grid, Header, Menu, Input, Message, Select, Card, Label, Button, Table, Image, Icon, Form } from 'semantic-ui-react'
import { wishlistURL, userIDURL, userUpdateURL, isStaffURL, superUserURL } from '../../constants'
import { authAxios } from '../../utils'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { localhost } from '../../constants'
import { NotificationContainer, NotificationManager } from 'react-notifications';



const PersonalInfor = () => {
    const initialFormData = Object.freeze({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        id: null
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [staff, setstaff] = useState();
    const [admin, setadmin] = useState();
    const [new_password1, setPass1] = useState();
    const [new_password2, setPass2] = useState();
    const [old_password, setOldPass] = useState();
    useEffect(() => {
        handleFetchItem()
        handelCheckStaff()
        handelCheckAdmin()
    }, [updateFormData]);
    const handleFetchItem = () => {
        authAxios
            .get(`${localhost}/rest-auth/user/`)
            .then((res) => {
                updateFormData({
                    ...formData,
                    ['username']: res.data.username,
                    ['first_name']: res.data.first_name,
                    ['last_name']: res.data.last_name,
                    ['email']: res.data.email,
                    ['id']: res.data.id,
                });
            });
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
        if (formData.first_name !== '' || formData.last_name !== '') {
            authAxios
                .put(userUpdateURL(formData.id), DataForm)
                .then(res => {
                    NotificationManager.success('Success message', 'Successfully updated personal information', 10000);
                })
                .catch(err => {
                    NotificationManager.console.error('Error message', 'Update failed', 10000);
                })
        } else {
            NotificationManager.warning('Warning message', 'You need input data', 10000);
        }

    };

    const handleChangePass=()=>{
        authAxios
            .post(`${localhost}/rest-auth/password/change/`, {
            new_password1,
            new_password2,
            old_password
            })
            .then(res=>{
                NotificationManager.success('Success message', 'Successfully updated password', 10000);
                handleOpenBox()
            })
            .catch(err=>{
                NotificationManager.console.error('Error message', 'Something wrong', 10000);
            })
    }

    const handelCheckStaff = () => {
        authAxios
            .get(isStaffURL)
            .then(res => {
                setstaff(res.data.isStaff)
            })
            .catch(err => {
            });
    }
    const handelCheckAdmin = () => {
        authAxios
            .get(superUserURL)
            .then(res => {
                setadmin(res.data.isAdmin)
            })
            .catch(err => {
            });
    }
    const handleOpenBox=()=>{
        let x = document.getElementById("change-pw-box");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
    }
    return (
        <Form>
            <Grid container>
                <Grid.Row columns={1}>
                    <Grid.Column>

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column className="border-css" width={8}>
                        <Header>{formData.username}</Header>
                        <Input placeholder='First Name' name="first_name" fluid onChange={handleChange} value={formData.first_name} />
                        <br />
                        <Input placeholder='Last Name' name="last_name" fluid onChange={handleChange} value={formData.last_name} />
                        <Header>Contact</Header>
                        <Input placeholder='E-mail' name="email" fluid onChange={handleChange} value={formData.email} />
                        <Header>Group Permission</Header>
                        {admin && (
                            <p>- Admin</p>
                        )}
                        {staff && (
                            <p>- Staff</p>
                        )}
                        <p>- Customer</p>

                    </Grid.Column>
                    <Grid.Column className="border-css " width={7} id="change-pw-box" textAlign="center" style={{display:"none"}}>
                        <Header>Change Password</Header>
                        <Input placeholder='Recent Password' fluid onChange={e => setOldPass(e.target.value)} value={old_password} type="password" />
                        <br />
                        <Input placeholder='New Password' fluid onChange={e => setPass1(e.target.value)} value={new_password1} type="password"/>
                        <br />
                        <Input placeholder='Re-New Password' fluid onChange={e => setPass2(e.target.value)} value={new_password2} type="password"/>
                        <br />
                        <Button onClick={handleChangePass}>Change</Button>

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{display:"flex",flexDirection:"row", alignItems:"center"}}>
                        <Button onClick={handleSubmit}>Update</Button>
                        <div style={{marginLeft:"200px", cursor:"pointer", color:"blue"}} onClick={handleOpenBox} >Change password</div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>

    );
}
export default PersonalInfor;
