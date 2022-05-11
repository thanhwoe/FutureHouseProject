import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,Input
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authSignup } from "../store/actions/auth";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Formik } from 'formik'
import * as yup from 'yup'

const ValidateSchema = yup.object({
  username: yup
    .string()
    .required('You need input username !'),
  email: yup
    .string()
    .email("Invalid email format")
    .required('You need input email !'),
  password1: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("You need input password !"),
  password2: yup
    .string()
    .oneOf([yup.ref('password1')], "Password not match!")
    .required("You need input password !")
})
const RegistrationForm = (props) => {
  const handleRegister = (values) => {
    props.signup(values.username, values.email, values.password1, values.password2);
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
          Signup to your account
        </Header>
        <Formik
          initialValues={{ username: '', email: '', password1: '', password2: '' }}
          validationSchema={ValidateSchema}
          onSubmit={(values, action) => {
            // action.resetForm()
            handleRegister(values)
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
                icon='mail'
                iconPosition='left'
                placeholder='Email'
                onChange={prop.handleChange('email')}
                value={prop.values.email}
                fluid
                style={{ marginBottom: '20px' }}
              />
              {(prop.errors.email && prop.touched.email) &&
                <p className='errMes passE'>{prop.errors.email}</p>
              }
              <Input
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                onChange={prop.handleChange('password1')}
                value={prop.values.password1}
                fluid
                style={{ marginBottom: '20px' }}
                type="password"

              />
              {(prop.errors.password1 && prop.touched.password1) &&
                <p className='errMes' style={{top:'168px'}}>{prop.errors.password1}</p>
              }
              <Input
                icon='lock'
                iconPosition='left'
                placeholder='Re-password'
                onChange={prop.handleChange('password2')}
                value={prop.values.password2}
                fluid
                style={{ marginBottom: '20px' }}
                type="password"

              />
              {(prop.errors.password2 && prop.touched.password2) &&
                <p className='errMes' style={{top:'226px'}}>{prop.errors.password2}</p>
              }
              <Button
                color="teal"
                fluid
                size="large"
                onClick={prop.handleSubmit}
                loading={props.loading}
                disabled={props.loading}
              >
                Register
              </Button>
            </Segment>

          )}
        </Formik>

        <Message>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

// class RegistrationForm extends React.Component {
//   state = {
//     username: "",
//     email: "",
//     password1: "",
//     password2: ""
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { username, email, password1, password2 } = this.state;
//     this.props.signup(username, email, password1, password2);
//   };

//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   render() {
//     const { username, email, password1, password2 } = this.state;
//     const { error, loading, token } = this.props;
//     if (token) {
//       return <Redirect to="/" />;
//     }
//     return (
//       <Grid
//         textAlign="center"
//         style={{ height: "100vh" }}
//         verticalAlign="middle"
//       >
//         <Grid.Column style={{ maxWidth: 450 }}>
//           <Header as="h2" color="teal" textAlign="center">
//             Signup to your account
//           </Header>
//           {error && <p>{this.props.error.message}</p>}

//           <React.Fragment>
//             <Form size="large" onSubmit={this.handleSubmit}>
//               <Segment stacked>
//                 <Form.Input
//                   onChange={this.handleChange}
//                   value={username}
//                   name="username"
//                   fluid
//                   icon="user"
//                   iconPosition="left"
//                   placeholder="Username"
//                 />
//                 <Form.Input
//                   onChange={this.handleChange}
//                   value={email}
//                   name="email"
//                   fluid
//                   icon="mail"
//                   iconPosition="left"
//                   placeholder="E-mail address"
//                 />
//                 <Form.Input
//                   onChange={this.handleChange}
//                   fluid
//                   value={password1}
//                   name="password1"
//                   icon="lock"
//                   iconPosition="left"
//                   placeholder="Password"
//                   type="password"
//                 />
//                 <Form.Input
//                   onChange={this.handleChange}
//                   fluid
//                   value={password2}
//                   name="password2"
//                   icon="lock"
//                   iconPosition="left"
//                   placeholder="Confirm password"
//                   type="password"
//                 />

//                 <Button
//                   color="teal"
//                   fluid
//                   size="large"
//                   loading={loading}
//                   disabled={loading}
//                 >
//                   Signup
//                 </Button>
//               </Segment>
//             </Form>
//             <Message>
//               Already have an account? <NavLink to="/login">Login</NavLink>
//             </Message>
//           </React.Fragment>
//         </Grid.Column>
//       </Grid>
//     );
//   }
// }

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (username, email, password1, password2) =>
      dispatch(authSignup(username, email, password1, password2))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);
