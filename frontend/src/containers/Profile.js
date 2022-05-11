import React, { useState, useEffect } from 'react'
import { Divider, Grid, Header, Menu, Input, Message, Select, Card, Label, Button, Table, Image, Icon, Form } from 'semantic-ui-react'
import { wishlistURL, userIDURL, userUpdateURL, paymentListURL, orderSummaryURL, orderItemDeleteURL } from '../constants'
import { authAxios } from '../utils'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { localhost } from '../constants'
import PersonalInfor from './componentsProfile/PersonalInfor'
import Wishlist from './componentsProfile/Wishlist'
import PaymentHistory from './componentsProfile/PaymentHistory'
import OrderList from './componentsProfile/OrderList'


class Profile extends React.Component {
    state = {
        activeItem: "personalInfo",
        userID: null,
    }

    componentDidMount() {
        this.handleFetchUserID()
    }

    handleItemClick = name => {
        this.setState({ activeItem: name })
    }

    handleGetActiveItem = () => {
        const { activeItem } = this.state
        if (activeItem === "orderList") {
            return "Order List"
        }
        else if (activeItem === "personalInfo") {
            return "Personal Information"
        }
        else if (activeItem === "wishlist") {
            return "My Wishlist"
        }
        else {
            return "Payment History"
        }
    }
    handleFetchUserID = () => {
        authAxios.get(userIDURL)
            .then(res => {
                this.setState({ userID: res.data.userID })
            })
            .catch(err => {
                this.setState({ error: err })
            })
    }
    render() {
        const { activeItem, error, loading, userID } = this.state
        const { isAuthenticated } = this.props
        let renderComponent
        switch (activeItem) {
            case "personalInfo":
                renderComponent = <PersonalInfor />
                break;
            case "paymentHistory":
                renderComponent = <PaymentHistory />
                break;
            case "orderList":
                renderComponent = <OrderList />
                break;
            case "wishlist":
                renderComponent = <Wishlist />
                break;
            default:
                renderComponent = <PersonalInfor />
                break;
        }
        if (!isAuthenticated) {
            return <Redirect to='/login' />
        }
        return (
            <Grid container columns={2} divided style={{minHeight:'600px', paddingTop:'50px'}}>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Menu pointing vertical fluid>
                            <Menu.Item name="Personal information" active={activeItem === "personalInfo"} onClick={() => this.handleItemClick('personalInfo')} />
                            <Menu.Item name="My Wishlist" active={activeItem === "wishlist"} onClick={() => this.handleItemClick('wishlist')} />
                            <Menu.Item name="My order" active={activeItem === "orderList"} onClick={() => this.handleItemClick('orderList')} />
                            <Menu.Item name="Payment history" active={activeItem === "paymentHistory"} onClick={() => this.handleItemClick('paymentHistory')} />
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Header>{this.handleGetActiveItem()}</Header>
                        <Divider />
                        {renderComponent}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Profile)