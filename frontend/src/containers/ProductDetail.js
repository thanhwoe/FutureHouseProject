import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Label, Item, Header, Form, Divider, Select, Tab } from 'semantic-ui-react'
import { productDetailURL, addToCartURL, addWishlistURL, userIDURL, checkWishlistURL } from '../constants'
import { authAxios } from "../utils"
import { fetchCart } from '../store/actions/cart'
import { SolarSystemLoading } from 'react-loadingg';
import ImageGallery from 'react-image-gallery';
import ThreeScene from './ThreeJS'
import UserComment from './ProductComment'
import { Link, Redirect } from 'react-router-dom'
import { localhost } from '../constants'
import StartRating from './components/StartRating'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Helmet } from "react-helmet";


class ProductList extends React.Component {

    state = {
        loading: true,
        error: null,
        data: [],
        url: '',
        searching: false,
        userID: null,
        Wishlist: []
    };
    componentDidMount() {
        window.scrollTo(0, 0)
        this.handleFetchItem()
        this.ifSearch()
        if (this.props.authenticated) {
            this.handleFetchUserID()
            this.handleCheckWishlist()
        }

    }

    // handleToggleForm = () => {
    //     const { formVisisble } = this.state
    //     this.setState({
    //         formVisisble: !formVisisble
    //     })
    // }

    handleFetchUserID = () => {
        authAxios
            .get(userIDURL)
            .then(res => {
                this.setState({ userID: res.data.userID })

            })
            .catch(err => {
                this.setState({ error: err, loading: false })
            });

    }


    handleFetchItem = () => {
        const { match: { params } } = this.props
        axios
            .get(productDetailURL(params.productID))
            .then(res => {
                this.setState({ data: res.data, loading: false })
            })
            .catch(err => {
                this.setState({ error: err, loading: false })
            });
    }

    handleCheckWishlist = () => {
        const { match: { params } } = this.props
        authAxios
            .get(checkWishlistURL(params.productID))
            .then(res => {
                this.setState({ Wishlist: res.data.user_wishlist })

            })
            .catch(err => {
            });
    }



    handleAddToWishList = id => {
        const { authenticated } = this.props
        if (authenticated) {
            authAxios
                .post(addWishlistURL(id))
                .then(res => {
                    this.handleCheckWishlist()
                    NotificationManager.success('Success message', 'Action Success',5000);

                })
                .catch(err => {
                });
        } else {
            NotificationManager.warning('Warning message', 'You need login first', 5000);

        }

    }


    handleAddToCart = slug => {
        const { authenticated } = this.props
        if (authenticated) {
            authAxios
                .post(addToCartURL, { slug })
                .then(res => {
                    this.props.refreshCart();

                    this.setState({ loading: false })
                    if (res.data) {
                        NotificationManager.success('Success message', res.data.message,5000);

                    }else{
                        NotificationManager.success('Success message', 'Added this product to cart',5000);
                        
                    }
                })
                .catch(err => {
                });
        } else {
            NotificationManager.warning('Warning message', 'You need login first', 5000);

        }
    }
    // handleChange = (e, { name, value }) => {
    //     const { formData } = this.state
    //     const updatedFormData = {
    //         ...formData,
    //         [name]: value
    //     }
    //     this.setState({ formData: updatedFormData })
    // }
    ifSearch = () => {
        const buttonSearch = document.querySelector('#buttonSearch');

        buttonSearch.addEventListener('click', event => {
            this.setState({ searching: true })
        });
    }




    render() {
        const { data, error, loading, userID, searching, Wishlist } = this.state;
        const { authenticated } = this.props
        // console.log(data)

        const item = data;
        const { isSearch } = this.props

        if (searching) {
            return <Redirect to='/' />
        }

        if (loading) {
            return (
            <Dimmer active><SolarSystemLoading /></Dimmer>
            )
        } else {
            const images = data.images.map(im => {
                return {
                    // original: `${localhost}${im.image}`,
                    // thumbnail: `${localhost}${im.image}`
                    original: im.image,
                    thumbnail: im.image
                }
            })
            return (
                <React.Fragment>
                    <Helmet><title>{data.title} | Future House</title></Helmet>
                    <Container>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column  >
                                    <ThreeScene files={data.files} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                    <Message style={{ borderRadius: '0px', fontSize: '1.5em' }}>
                        <Container>
                            <Message.Header>
                                <Label color={item.label === "trending" ? "blue" : item.label === "new" ? 'green' : 'olive'}>
                                    {item.label}
                                </Label>
                                <Label color={item.label === "trending" ? "blue" : item.label === "new" ? 'green' : 'olive'}>
                                    {item.category}
                                </Label>
                            </Message.Header>
                            <Divider hidden />
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        <Icon name='expand' /> {data.square_foot}  &#13217;
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Icon name='bed' /> {data.beds} Beds
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Icon name='bath' /> {data.baths} Baths
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Icon name='warehouse' /> {data.stories} Stories
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Icon name='car' /> {data.garages} Garages
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Message>
                    {/* <Container style={{ display: 'flex', justifyContent: 'center' }}> */}
                    <Container >
                        <Grid divided>
                            <Grid.Row >
                                <Grid.Column width={8} style={{ height: '530px' }}>
                                    <ImageGallery
                                        items={images}
                                        thumbnailPosition={'left'}
                                        showPlayButton={false}
                                        showFullscreenButton={false}
                                        showNav={false}
                                        showIndex={true} />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Message style={{ height: '100%' }}>

                                        <Header as='h2'>{data.title}</Header>
                                        <div style={{ display: 'flex', alignSelf: 'center', marginTop: '20px' }}>
                                            <p style={{ fontSize: '15px', marginRight: '10px' }}>Rate: {data.avarage_rate}</p>
                                            <StartRating id={data.id} /> &nbsp;|
                                            <p style={{ fontSize: '15px', margin: ' 0 10px', }}>Comments: {data.count_comment}</p>
                                            &nbsp;|
                                            <p style={{ fontSize: '15px', margin: ' 0 10px', }}>Sold: {data.count_sell}</p>
                                        </div>
                                        <div className='label-price'>
                                            <div style={{ "textDecoration": "line-through", "color": "#929292" }}>${item.price}</div>
                                            <div style={{ "margin": "0 15px" }}>-</div>
                                            <div > ${item.discount_price}</div>
                                        </div>
                                        <div style={{ height: '55%' }}>
                                            <Header>Description </Header>
                                            {item.description}
                                        </div>
                                        <div>
                                            <Button
                                                icon
                                                style={{ 'width': '220px', 'height': '37px', 'marginRight': '50px', 'backgroundColor':'#48dbfb' }}
                                                labelPosition="right"
                                                onClick={() => this.handleAddToCart(item.slug)}
                                            > Add to cart <Icon name="cart plus" />
                                            </Button>
                                            <Button
                                                style={{ 'width': '220px', 'height': '37px', 'border': '3px solid #48dbfb', 'backgroundColor':'#F8F8F9' }}
                                                icon
                                                labelPosition="right"

                                                onClick={() => this.handleAddToWishList(item.id)}
                                            > {Wishlist.includes(userID) & authenticated ? (
                                                <>Remove from Wishlist<Icon name="minus" /></>
                                            ) : (<>Add to Wishlist<Icon name="plus" /></>)}
                                            </Button>
                                        </div>

                                    </Message>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>

                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <UserComment Item_ID={data.id} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </React.Fragment>
            )
        }
    }

}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        isSearch: state.search.loading

    };
};

const mapDispatchToProps = dispatch => {
    return {
        refreshCart: () => dispatch(fetchCart())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList))