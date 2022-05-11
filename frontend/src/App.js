import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link,Switch, } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import "semantic-ui-css/semantic.min.css";
import './App.css';
import './mainCss.css';
import './Chat.css';
import CustomLayout from "./containers/Layout";
import LandingPage from "./containers/LandingPage";

import 'react-notifications/lib/notifications.css';
import * as messageActions from "./store/actions/message";
import WebSocketInstance from "./websocket";
import {localhost} from'./constants'

class App extends Component {
  constructor(props) {
    super(props);
    WebSocketInstance.addCallbacks(
      this.props.setMessages.bind(this),
      this.props.addMessage.bind(this)
    );
  }

  state = {
    isMainScreen: true
  }
  componentDidMount() {
    this.props.onTryAutoSignup();
    this.handleValidURL()
  }


  handleValidURL = () => {
    let current = window.location.href
    let landing = `https://stark-badlands-33991.herokuapp.com/landing-page`
    if (current == landing) {
      this.setState({ isMainScreen: false })
    }
  }


  render() {
    const { isMainScreen } = this.state
    return (
      <>
        <Router>
          {isMainScreen ? (
            <CustomLayout {...this.props} >
              <BaseRouter />
            </CustomLayout>
          ) : (
            <Route path="/landing-page" ><LandingPage /></Route>
          )}
        </Router>
      </>

    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    addMessage: message => dispatch(messageActions.addMessage(message)),
    setMessages: messages => dispatch(messageActions.setMessages(messages))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
