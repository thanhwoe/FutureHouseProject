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
import { authLogin } from "../store/actions/auth";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Formik } from 'formik'
import * as yup from 'yup'
import Resetpassboxemail from "./components/ResetPassBoxEmail";
import React from "react";
const ValidateSchema = yup.object({
  username: yup
    .string()
    .required('You need input username !'),
  password: yup
    .string()
    // .min(6, "Minimum 6 characters")
    .required("You need input password !"),
})

const LoginForm = (props) => {
  const [resetPW, setResetPW] = useState(false);

  const handleLogin = (values) => {
    props.login(values.username, values.password);
  }
  if (props.error) {
    NotificationManager.error('Error message', 'Wrong username or password', 5000);
  }
  if (props.token) {
    return <Redirect to="/" />;
  }
  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
        {!resetPW ? ("Log-in to your account"):("Reset Password")}
        </Header>
        {!resetPW ? (
          <React.Fragment>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={ValidateSchema}
              onSubmit={(values, action) => {
                // action.resetForm()
                handleLogin(values)
              }}>
              {(prop) => (
                <Segment stacked>
                  <Input
                    icon='user'
                    iconPosition='left'
                    placeholder='Username'
                    onChange={prop.handleChange('username')}
                    value={prop.values.username}
                    fluid
                    style={{ marginBottom: '20px' }}
                  />
                  {(prop.errors.username && prop.touched.username) &&
                    <p className='errMes userNameE'>{prop.errors.username}</p>
                  }
                  <Input
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    onChange={prop.handleChange('password')}
                    value={prop.values.password}
                    fluid
                    style={{ marginBottom: '20px' }}
                    type="password"

                  />
                  {(prop.errors.password && prop.touched.password) &&
                    <p className='errMes passE'>{prop.errors.password}</p>
                  }
                  <Button
                    color="teal"
                    fluid
                    size="large"
                    onClick={prop.handleSubmit}
                    loading={props.loading}
                    disabled={props.loading}
                  >
                    Login
                  </Button>
                </Segment>

              )}
            </Formik>
            <Message>
              New to us? <NavLink to="/signup">Sign Up</NavLink>
              <br />
              Forgot your password? <span onClick={() => setResetPW(true)} style={{ color: "#4183C4", cursor: 'pointer' }}>Reset it</span>
            </Message>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Resetpassboxemail />
            <Message>
              Remembered your password?<span onClick={() => setResetPW(false)} style={{ color: "#4183C4", cursor: 'pointer' }}>Log in</span>
            </Message>
          </React.Fragment>
        )}


      </Grid.Column>

    </Grid >

  )
}



const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
