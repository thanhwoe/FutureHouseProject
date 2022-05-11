import Reactm, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Input
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { localhost } from '../../constants'
import axios from "axios";

const Resetpassboxemail = () => {
    const [email, setEmail] = useState();
    const handelSubmit = ()=>{
        // axios
        // .post(`${localhost}/rest-auth/password/reset/`,{email})
        // .then(res=>{
        //     NotificationManager.success('Success message', 'Successfully updated personal information', 10000);
        // })
        // .catch(err=>{
        //     console.log(JSON.stringify(err))
        // })
    }
    return (
            <Segment stacked>
              <Input
                icon='mail'
                iconPosition='left'
                placeholder='Email'
                onChange={e=>setEmail(e.target.value)}
                value={email}
                fluid
                style={{marginBottom:'20px'}}
              />

              <Button
                color="teal"
                fluid
                size="large"
                onClick={handelSubmit}
              >Send</Button>
            </Segment>
    );
}

export default Resetpassboxemail;
