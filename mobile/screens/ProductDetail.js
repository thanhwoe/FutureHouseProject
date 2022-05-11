import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Button, Alert, FlatList, Platform, StatusBar, Dimensions, TextInput, ScrollView, Pressable, Keyboard } from 'react-native';
import { icons } from '../constants';
import { productDetailURL, userIDURL, postCommentURL, addToCartURL, addWishlistURL, checkWishlistURL } from '../apiURL'
import axios from 'axios'
import Three from './Three';
import Swiper from 'react-native-swiper';
import Slide from './Slide';
import { connect } from 'react-redux'
import { fetchCart } from '../store/actions/cart'
import { localhost } from '../apiURL';
import Comment from '../components/Comment';
import { useNavigation, useRoute } from "@react-navigation/native"
import BackNavigator from '../components/BackNavigator';



const ProductDetail = (props) => {
    const navigation = useNavigation()
    const route = useRoute()

    let { item } = route.params

    const [data, setData] = useState();
    const [isComment, setIsComment] = useState(false);
    const [userID, setUserID] = useState();
    const [content, setContent] = useState('');
    const [wishlist, setWishlist] = useState([]);
    // number check show comment input
    const [offsetY, setOffsetY] = useState();

    const childRef = useRef();

    useEffect(() => {
        handleFetchData()

        if (props.authenticated) {
            props.refreshCart();
            handelGetUserId()
            handleCheckWishlist()
        }
    }, [])

    const handleFetchData = () => {
        axios
            .get(productDetailURL(item.id))
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleAddToCart = slug => {
        if (props.authenticated) {
            axios
                .post(addToCartURL, { slug })
                .then(res => {
                    props.refreshCart();

                    if (res.data) {
                        Alert.alert(res.data.message)

                    }
                })
                .catch(err => {
                    // console.log(err)
                });
        } else {
            Alert.alert('You need login first')
        }

    }
    const handelGetUserId = () => {
        axios
            .get(userIDURL)
            .then(res => {
                setUserID(res.data.userID)
            })
    }
    const handlePostComment = () => {
        if (content !== '') {
            axios
                .post(postCommentURL, {
                    User_ID: userID,
                    Item_ID: data.id,
                    content: content
                })
                .then(res => {
                    childRef.current.RefGetComment()
                    // handleGetComment()
                    setContent('')

                })
                .catch(err => {
                    console.log(JSON.stringify(err))
                })
        } else {
            Alert.alert('input comment')
        }
    }
    const handleScroll = (event) => {
        // console.log(event.nativeEvent.contentOffset.y);
        if (event.nativeEvent.contentOffset.y > offsetY) { setIsComment(true) }
        else { setIsComment(false) }
    }
    const handleNavigateCart = () => {
        if (props.authenticated) {
            navigation.navigate('UserOrder')
        } else {
            Alert.alert('You need login first')
        }
    }
    const handleCheckWishlist = () => {
        axios
            .get(checkWishlistURL(item.id))
            .then(res => {
                setWishlist(res.data.user_wishlist)
            })
            .catch(err => {
            });
    }



    const handleAddToWishList = () => {
        if (props.authenticated) {
            axios
                .post(addWishlistURL(item.id))
                .then(res => {
                    handleCheckWishlist()
                })
                .catch(err => {
                });
        } else {
            Alert.alert('You need login first')
        }

    }


    // console.log(data)
    function renderHeaderCart() {
        // console.log(wishlist)
        return (
            <View style={{
                position: 'absolute',
                top: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                right: 15,
                zIndex: 2,
                flexDirection: 'row'
            }}>
                <TouchableOpacity
                    style={{ marginTop: 5, padding: 10, }}
                    onPress={handleAddToWishList}
                >
                    <Image
                        source={icons.heart}
                        resizeMode='contain'
                        style={[styles.icon, wishlist.includes(userID) ? styles.iconChecked : styles.iconUncheck]} />

                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 5, padding: 10, }}
                    onPress={handleNavigateCart}
                >
                    <Image
                        source={icons.cart}
                        resizeMode='contain'
                        style={{ width: 30, height: 30 }} />
                    <View
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 3,
                            paddingVertical: 2,
                            paddingHorizontal: 7,
                            borderRadius: 25,
                            backgroundColor: '#D5E3EB'
                        }}
                    ><Text>{props.cart !== null & props.authenticated ? props.cart.order_items.length : 0}</Text></View>
                </TouchableOpacity>
            </View>

        )
    }
    function renderContent() {
        return (
            <View style={styles.contentView}>
                <Text style={styles.Prodname}>{data.title}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 20
                    }}
                >
                    <Text style={{ fontSize: 15 }}>{data.category}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                textDecorationLine: 'line-through',
                                fontSize: 25,
                                color: '#535c68'
                            }}
                        >${data.discount_price}</Text>
                        <Text style={{ fontSize: 25 }}> - ${data.price}</Text>
                    </View>
                </View>
                <View style={{
                    height: 100,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    // marginBottom:5
                }}>
                    <View>
                        <Image source={icons.bath} style={styles.customIcon} />
                        <Text style={styles.text1}>{data.baths} bath</Text>
                    </View>
                    <View>
                        <Image source={icons.ruler} style={styles.customIcon} />
                        <Text style={styles.text1}>{data.square_foot} m<Text style={{ fontSize: 14 }}>2</Text></Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={icons.stair} style={styles.customIcon} />
                        <Text style={styles.text1}>{data.stories} storie</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={icons.garage} style={styles.customIcon} />
                        <Text style={styles.text1}>{data.garages} garage</Text>
                    </View>
                    <View>
                        <Image source={icons.bed} style={styles.customIcon} />
                        <Text style={styles.text1}>{data.beds} bed</Text>
                    </View>
                </View>
            </View>
        )
    }
    function productDetail() {
        if (data) {
            const imgList = []
            data.images.map(im => {
                imgList.push(`${im.image}`)
            })
            // console.log(imgList)
            return (
                <View style={{
                    width: '100%',
                    backgroundColor: '#E8F6EF',
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    // height: 500
                }}
                    onLayout={event => {
                        const layout = event.nativeEvent.layout;
                        setOffsetY(layout.y)
                    }}
                >
                    <Text style={styles.headerText}> - Product Detail - </Text>

                    {/* description text View */}
                    <View style={{ marginVertical: 10 }}>
                        <Text>{data.description}</Text>
                    </View>

                    {/* slide image View */}
                    <View style={{ flex: 1, height: 300 }}>
                        <Swiper loadMinimal loadMinimalSize={1} loop={true}>
                            {
                                imgList.map((item, i) => <Slide
                                    uri={item}
                                    i={i}
                                    key={i} />)
                            }
                        </Swiper>
                    </View>
                </View>
            )
        }
    }
    function comment() {

        return (
            <View
                style={{ width: '100%', height: 500, backgroundColor: '#E8F6EF', paddingHorizontal: 10, paddingVertical: 20 }}

            >
                <Text style={styles.headerText}> - Comment - </Text>
                <Comment id={data.id} ref={childRef} />
            </View>
        )
    }
    function divider() {
        return (
            <View style={{ width: '100%', height: 5, backgroundColor: '#C3CBDE' }}></View>
        )
    }
    function bottomActions() {
        return (
            <View style={styles.btnSticky}>
                <TouchableOpacity
                    onPress={() => handleAddToCart(data.slug)}
                >
                    <Text style={{ ...styles.customBtn, backgroundColor: '#38ada9', }} >Add To Cart</Text>
                </TouchableOpacity>
            </View>
        )
    }
    function inputText() {
        return (
            <View style={styles.inputSticky}>
                <TextInput
                    style={styles.input}
                    onChangeText={setContent}
                    value={content}
                    placeholder="Write comment..."
                />
                <Pressable onPress={() => { handlePostComment(); Keyboard.dismiss() }}>
                    <Image
                        source={icons.send}
                        style={{ width: 25, height: 25, marginLeft: 15 }}
                        resizeMode="contain"
                    />
                </Pressable>

            </View>
        )
    }

    if (!data) {
        return (
            <View><Text>Loading</Text></View>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <BackNavigator />
                {renderHeaderCart()}
                <Three files={data.files} />
                <ScrollView
                    onScrollEndDrag={handleScroll}
                    scrollEventThrottle={160}
                >
                    {renderContent()}
                    {divider()}
                    {productDetail()}
                    {divider()}
                    {comment()}
                </ScrollView>
                {isComment & props.authenticated ? (
                    inputText()
                ) : (
                    <View />
                )}
                {!isComment & props.authenticated ? (
                    bottomActions()
                ) : (
                    <View />
                )}

            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: '#F5F5F5'
    },
    contentView: {
        marginTop: '80%',
        flex: 1,
        backgroundColor: '#E8F6EF',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40
    },
    Prodname: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    btnSticky: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center'

    },
    customBtn: {
        // borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#dff9fb'
    },
    customIcon: {
        width: 40,
        height: 40,
    },
    text1: {
        fontSize: 17,
        textAlign: 'center'
    },
    headerText: {
        fontSize: 30,
        textAlign: 'center',
        color: 'black'
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    inputSticky: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#38ada9'
    },
    input: {
        height: 40,
        width: '85%',
        padding: 10,
        backgroundColor: '#D5E3EB',
        borderRadius: 10,
        fontSize: 18
    },
    icon: {
        width: 30, height: 30
    },
    iconChecked: {
        tintColor: '#e74c3c'
    },
    iconUncheck: {
        tintColor: 'black'
    }


})


const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        cart: state.cart.shoppingCart,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        refreshCart: () => dispatch(fetchCart())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)

// export default ProductDetail;
