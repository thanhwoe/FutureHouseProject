import React, { useEffect } from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Icon,
  Header,
  Image,
  List,
  Input,
  Menu,
  Segment
} from "semantic-ui-react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { fetchCart } from "../store/actions/cart";
import { handleSearchData } from "../store/actions/search";
import axios from 'axios'
import { authAxios } from "../utils"
import { isStaffURL } from '../constants'
import img from '../image/loogu.png'
import imgPay from '../image/PayPal_logo.png'
import imgStripe from '../image/Stripe_Logo.png'
import imgApp from '../image/downApp.png'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { searchFail } from "../store/actions/search"
import ChatButton from "./components/ChatButton";
import { localhost } from '../constants'
import Popup from 'reactjs-popup';



class CustomLayout extends React.Component {

  state = {
    searchKey: '',
    isStaff: false,
    authenticated: false
  }

  componentDidMount() {
    this.props.fetchCart()
    this.handelCheckStaff()
  }


  handelChange = (e) => {
    this.setState({ searchKey: e.target.value });
  }
  handleSearch = () => {
    const { searchKey } = this.state
    if (searchKey == '') {
      NotificationManager.warning('Warning message', 'You need input search key', 10000);
      this.props.searchFail()
    } else {
      this.props.search(searchKey);
      window.scrollTo(0, 500)
    }
  }
  refreshPage = () => {
    document.location.href = "/";
  }
  handelCheckStaff = () => {
    authAxios
      .get(isStaffURL)
      .then(res => {
        this.setState({ isStaff: res.data.isStaff })
        console.log(res.data.isStaff)
      })
      .catch(err => {
      });
  }

  render() {
    const { authenticated, cart, loading } = this.props;
    // console.log(loading)
    const { isStaff } = this.state
    return (
      <React.Fragment>
        <Menu className="fix-menu sub-menu">
          <Container>
            <Menu.Menu position="right">
              {/* <Dropdown icon='bell' text="Notification">
                <Dropdown.Menu>
                  {authenticated ? (
                    <Dropdown.Item>Noti1</Dropdown.Item>
                  ) : (<Dropdown.Item>Login to see noti</Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown> */}
              {authenticated ? (
                <React.Fragment>
                  <Link to="/profile">
                    <Menu.Item className="header-profile">Profile</Menu.Item>
                  </Link>
                  {isStaff ? (
                    <Link to="/dashboard">
                      <Menu.Item className="header-profile">Dashboard</Menu.Item>
                    </Link>
                  ) : (
                    <div />
                  )}
                  <Menu.Item header onClick={() => this.props.logout()}>
                    Logout
                  </Menu.Item>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link to="/login">
                    <Menu.Item header>Login</Menu.Item>
                  </Link>
                  <Link to="/signup">
                    <Menu.Item header>Signup</Menu.Item>
                  </Link>
                </React.Fragment>

              )}

            </Menu.Menu>
          </Container>
        </Menu>
        <Menu className="fix-menu main-menu">
          <Container>
            <div className="main-logo" >
              {/* onClick={() => this.refreshPage()} */}
              <Link to='/'>
                <Menu.Item header >
                  <Image centered size="small" src={img} className='home-logo' />
                </Menu.Item>
              </Link>
            </div>
            <Input
              icon={<Icon name='search' size="large" id='buttonSearch' bordered link onClick={() => this.handleSearch()}/>}
              placeholder='Search...'
              onChange={this.handelChange}
              className="searchInput"
            />
            <div className='header-cart'>
              {authenticated ? (
                <Dropdown
                  text={`${cart !== null ? cart.order_items.length : 0}`}
                  icon="cart"
                  pointing="top right"
                  direction="left"
                  className='link item customCart'
                  style={{ zIndex: "5" }}>
                  <Dropdown.Menu className='customMenu' >
                    {cart !== null ? (
                      <React.Fragment>
                        {cart.order_items.map(order_item => {
                          return (
                            <Dropdown.Item key={order_item.id} >
                              <div className='cart-item'>
                                <Image src={order_item.item.thumbnail} size='tiny' />
                                <div className='info'>
                                  <p>{order_item.item.title}</p>
                                  <p>Price: ${order_item.item.discount_price}</p>
                                </div>
                              </div>
                            </Dropdown.Item>
                          )
                        })}
                        {cart.order_items.length < 1 ? (
                          <Dropdown.Item>
                            <div className='cart-item'>
                              <p style={{ textAlign: 'center' }}>No items in your cart</p>
                            </div>
                          </Dropdown.Item>
                        ) : null}
                        <Dropdown.Item className="btn_checkout" onClick={() => this.props.history.push('/checkout')}>Checkout</Dropdown.Item>

                        {/* <Dropdown.Divider /> */}
                      </React.Fragment>
                    ) : (<Dropdown.Item>
                      <div className='cart-item'>
                        <p style={{ textAlign: 'center' }}>No items in your cart</p>
                      </div>
                    </Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Dropdown
                  icon="cart"
                  pointing="top right"
                  direction="left"
                  className='link item customCart'
                  style={{ zIndex: "5" }}
                  text='0'
                >
                  <Dropdown.Menu className='customMenu'><Dropdown.Item>
                    <div className='cart-item' style={{ justifyContent: 'center' }}>
                      <p>You need login first</p>
                    </div>
                  </Dropdown.Item></Dropdown.Menu>
                </Dropdown>
              )}
            </div>


          </Container>
        </Menu>

        {this.props.children}


        <Segment
          inverted
          vertical
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
        >
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="CUSTOMER SERVICE" />
                <List link inverted>
                  <List.Item as="a"><Link to="/blogs-list">Blogs</Link></List.Item>
                  <List.Item as="a"><Link to="/doc/howtobuy">How to buy </Link></List.Item>
                  <List.Item as="a"><Link to="/doc/paymentmethod">Payment Methods</Link></List.Item>
                  <List.Item as="a"><Link to="/doc/contactus">Contact Us</Link></List.Item>

                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="INTRODUCTION" />
                <List link inverted>
                  <List.Item as="a"><Link to="/doc/aboutus">About Us</Link></List.Item>
                  <List.Item as="a"><Link to="/doc/termsofservice">Terms and Conditions</Link></List.Item>
                  <List.Item as="a"><Link to="/doc/privacypolicy">Privacy Policy</Link></List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="PAYMENT" />
                <List link inverted>
                  <List.Item as="a" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Image src={imgPay} size='tiny' />
                    <Image src={imgStripe} size='tiny' />
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="FOLLOW US" />
                <List link inverted>
                  <List.Item as="a">Facebook</List.Item>
                  <List.Item as="a">Instagram</List.Item>
                  <List.Item as="a">Youtube</List.Item>
                  <List.Item as="a">Linkedln</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header inverted as="h4" content="MOBILE APP" />
                <List link inverted>
                  <List.Item as="a">
                    <Image src={imgApp} size='small' />
                  </List.Item>

                </List>
              </Grid.Column>

            </Grid>

            <Divider inverted section />
            <List  inverted  link size="small">
              <List.Item as="a" href="#">
                Just give me data, I can do many interesting things with it.
              </List.Item>
              <List.Item as="span" >
              Future House - Copyright © 2021.
              </List.Item>
            </List>
          </Container>
        </Segment>
        <NotificationContainer />
        <Popup open={!authenticated} closeOnDocumentClick>
        <div >
          <Header as='h1' color='red' textAlign='center'>Alert!</Header>
        This is a website for learning. 
        Products on the website for the demo process. 
        The functions and payment methods will work correctly. 
        Please don't buy anything!
        </div>
      </Popup>
              
        {authenticated && (<ChatButton />)}

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
    cart: state.cart.shoppingCart,
    loading: state.cart.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchCart: () => dispatch(fetchCart()),
    search: (searchKey) => dispatch(handleSearchData(searchKey)),
    searchFail: () => dispatch(searchFail()),

  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
