import React, { useState, useEffect } from 'react'
import { Divider, Grid, Header, Menu, Input, Message, Select, Card, Label, Button, Table, Image, Icon, Form } from 'semantic-ui-react'
import { wishlistURL, addWishlistURL, addToCartURL } from '../../constants'
import { authAxios } from '../../utils'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { localhost } from '../../constants'
import { fetchCart } from '../../store/actions/cart'
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Wishlist = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        handleFetchItem()
    }, []);
    const handleFetchItem = () => {
        authAxios
            .get(wishlistURL)
            .then((res) => {
                setData(res.data)
            });
    }
    const handleAddToCart = (slug,id) => {
        authAxios
            .post(addToCartURL, { slug })
            .then(res => {
                props.refreshCart();
                handleAddToWishList(id)
                if (res.data) {
                    NotificationManager.success('Success message', res.data.message);

                }else{
                    NotificationManager.success('Success message', 'Added this product to cart');
                    
                }
            })
            .catch(err => {
            });
    }
    const handleAddToWishList = id => {
        authAxios
            .post(addWishlistURL(id))
            .then(res => {
                handleFetchItem()
                NotificationManager.success('Success message', 'Action Success');

            })
            .catch(err => {
            });
    }
    return (
        <div style={{ display: 'flex', 'flexWrap': 'wrap' }}>
            {data.map(item => {
                return(
                <Card key={item.id} style={{marginBottom:'30px'}}>
                    <Card.Content>
                        <Image src={item.thumbnail}  size='medium' />
                        <Link to={{ pathname: `products/${item.id}` }} >
                            <Card.Header >{item.title}</Card.Header>
                        </Link>

                        <Card.Meta>
                            <span className='cinema'>{item.category}</span>
                        </Card.Meta>
                        <Card.Description>{item.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button
                                color="yellow"
                                // icon
                                // style={{ 'width': '220px', 'height': '37px', 'marginRight': '50px' }}
                                // labelPosition="right"
                                onClick={() => handleAddToCart(item.slug ,item.id)}
                            > Add to cart </Button>
                            <Button
                                color="green"
                                // style={{ 'width': '220px', 'height': '37px' }}
                                // icon
                                // labelPosition="right"

                                onClick={() => handleAddToWishList(item.id)}
                            > Remove from Wishlist</Button>
                        </div>
                    </Card.Content>

                </Card>)
            })}
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        refreshCart: () => dispatch(fetchCart())
    }
}

export default connect(null, mapDispatchToProps)(Wishlist);
