import React, { Component } from 'react';
import { Divider, Form, Grid, Header, Menu, Message, Select, Card, Label, Button, Table, Image, Icon } from 'semantic-ui-react'
import { isStaffURL, superUserURL } from '../constants'
import { authAxios } from "../utils"
import ProductOverView from './componentsDashboard/ProductOverView';
import ProductCreate from './componentsDashboard/ProductCreate';
import ProductUpdate from './componentsDashboard/ProductUpdate';
import CustomerOverView from './componentsDashboard/CustomerOverView';
import OrderOverView from './componentsDashboard/OrderOverView';
import DiscountOverView from './componentsDashboard/DiscountOverView';
import DiscountCreate from './componentsDashboard/DiscountCreate';
import ArticleOverView from './componentsDashboard/ArticleOverView';
import ArticleCreate from './componentsDashboard/ArticleCreate';
import DashboardHome from './componentsDashboard/DashboardHome';
import EmailCreate from './componentsDashboard/EmailCreate';
import Analytics from './componentsDashboard/Analytics';
import AssignStaff from './componentsDashboard/AssignStaff';
import ChatBox from './componentsDashboard/ChatBox';
import Blockuser from './componentsDashboard/BlockUser';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Dashboard extends Component {
    state = {
        activeItem: "Home",
        userID: null,
        isStaff: false,
        isCreate: false,
        isAdmin: false,


    }
    componentDidMount() {
        this.handelCheckStaff()
        this.handelCheckAdmin()
    }
    handelCheckStaff = () => {
        authAxios
            .get(isStaffURL)
            .then(res => {
                this.setState({ isStaff: res.data.isStaff })
            })
            .catch(err => {
            });
    }
    handelCheckAdmin = () => {
        authAxios
            .get(superUserURL)
            .then(res => {
                this.setState({ isAdmin: res.data.isAdmin })
            })
            .catch(err => {
            });
    }

    handleItemClick = name => {
        this.setState({ activeItem: name, isCreate: false })
    }
    handleItemClickCreate = name => {
        this.setState({ activeItem: name, isCreate: true })
    }
    handleGetActiveItem = () => {
        const { activeItem } = this.state
        switch (activeItem) {
            case "Home":
                return <Header>Home</Header>
            case "Products":
                return (
                    <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                        <Header>Products</Header>
                        <Button onClick={() => this.handleItemClickCreate("CreateProduct")}>Create Product</Button>
                    </div >
                )
            case "Customers":
                return <Header>Customers</Header>
            case "Orders":
                return <Header>Orders</Header>
            case "Discounts":
                return (
                    <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                        <Header>Discounts</Header>
                        <Button onClick={() => this.handleItemClickCreate("CreateVoucher")}>Create Voucher</Button>
                    </div >
                )
            case "Articles":
                return (
                    <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                        <Header>Articles</Header>
                        <Button onClick={() => this.handleItemClickCreate("ArticlesCreate")}>Create Article</Button>
                    </div >
                )
            case "Analytics":
                return (
                    <Header>Analytics</Header>
                )
            case "Email":
                return <Header>Write Email</Header>
            case "Admin":
                return <Header>Assign Staff</Header>
            case "ChatBox":
                return <Header>Feedbacks</Header>
            case "Block":
                return <Header>Block User</Header>

        }
    }
    render() {
        const { activeItem, isStaff, isCreate, isAdmin } = this.state
        let renderComponent
        if (!this.props.isAuthenticated) {
            return <Redirect to='/login' />
        }
        switch (activeItem) {
            case "Home":
                renderComponent = <DashboardHome />
                break;
            case "Products":
                renderComponent = <ProductOverView />
                break;
            case "Customers":
                renderComponent = <CustomerOverView />
                break;
            case "Orders":
                renderComponent = <OrderOverView />
                break;
            case "CreateProduct":
                renderComponent = <ProductCreate />
                break;
            case "UpdateProduct":
                renderComponent = <ProductUpdate />
                break;
            case "Discounts":
                renderComponent = <DiscountOverView />
                break;
            case "CreateVoucher":
                renderComponent = <DiscountCreate />
                break;
            case "Articles":
                renderComponent = <ArticleOverView />
                break;
            case "ArticlesCreate":
                renderComponent = <ArticleCreate />
                break;
            case "Email":
                renderComponent = <EmailCreate />
                break;
            case "Analytics":
                renderComponent = <Analytics />
                break;
            case "Admin":
                renderComponent = <AssignStaff />
                break;
            case "ChatBox":
                renderComponent = <ChatBox />
                break;
            case "Block":
                renderComponent = <Blockuser />
                break;
            default:
                renderComponent = <DashboardHome />
                break;
        }
        return (

            <React.Fragment>
                {isStaff ? (
                    <Grid style={{ "paddingRight": "40px" }}>
                        <Grid.Row columns={1}>
                            <Grid.Column>

                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row >
                            <Grid.Column width={3}>
                                <Menu pointing vertical fluid>
                                    <Menu.Item name="Home" active={activeItem === "Home"} onClick={() => this.handleItemClick('Home')} />
                                    <Menu.Item name="Analytics" active={activeItem === "Analytics"} onClick={() => this.handleItemClick('Analytics')} />
                                    <Menu.Item name="Products" active={activeItem === "Products" || activeItem === "CreateProduct"} onClick={() => this.handleItemClick('Products')} />
                                    <Menu.Item name="Customers" active={activeItem === "Customers"} onClick={() => this.handleItemClick('Customers')} />
                                    <Menu.Item name="Orders" active={activeItem === "Orders"} onClick={() => this.handleItemClick('Orders')} />
                                    <Menu.Item name="Discounts" active={activeItem === "Discounts"} onClick={() => this.handleItemClick('Discounts')} />
                                    <Menu.Item name="Articles" active={activeItem === "Articles"} onClick={() => this.handleItemClick('Articles')} />
                                    <Menu.Item name="Write Email" active={activeItem === "Email"} onClick={() => this.handleItemClick('Email')} />
                                    {isAdmin ? (
                                        <React.Fragment>
                                            <Menu.Item name="Assign Staff" active={activeItem === "Admin"} onClick={() => this.handleItemClick('Admin')} />
                                            <Menu.Item name="Feedbacks" active={activeItem === "ChatBox"} onClick={() => this.handleItemClick('ChatBox')} />
                                            <Menu.Item name="Block User" active={activeItem === "Block"} onClick={() => this.handleItemClick('Block')} />
                                        </React.Fragment>

                                    ) : null}

                                </Menu>
                            </Grid.Column>
                            <Grid.Column width={13}>
                                <div>{this.handleGetActiveItem()}</div>
                                <Divider />
                                {isCreate ? (
                                <Icon name="arrow left" size='big' onClick={() => this.handleItemClick('Home')} style={{ position:"absolute",top:"60px" ,zIndex:3}}/>
                        ) : (<div />)}
                                {renderComponent}
                            </Grid.Column>
                        </Grid.Row>
                        
                    </Grid>
                ) : (
                    <Header textAlign='center' as='h1'>You don't have permission</Header>
                )}
            </React.Fragment>

        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Dashboard)
