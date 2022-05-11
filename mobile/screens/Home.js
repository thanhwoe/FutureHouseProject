import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput, ActivityIndicator, Pressable } from 'react-native';
import { icons, options } from '../constants'
import axios from 'axios'
import { productListURL, postBlogURL } from '../apiURL'
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native"
import { handleSearchData } from "../store/actions/search";
import { localhost } from '../apiURL';


const Home = (props) => {
    const navigation = useNavigation()
    const [searchKey, setSearchKey] = useState("");
    const [data, setData] = useState([]);
    const [hasMore, sethasMore] = useState(true);
    const [offset, setoffset] = useState(0);
    const [limit, setlimit] = useState(3);
    useEffect(() => {
        loadData()
    }, [])

    const handleFetchData = () => {
        axios
            .get(productListURL)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSearch = () => {
        props.search(searchKey)
        // console.log('aa')
        navigation.navigate('Search')
    }

    const loadData = () => {
        if (hasMore) {
            setTimeout(() => {
                axios
                    .get(
                        `${localhost}/api/products-list-inf/?limit=${limit}&offset=${offset}`
                    ).then(res => {
                        let newData = res.data.data
                        let newOfset = offset + limit
                        console.log('has   :' + res.data.has_more)
                        sethasMore(res.data.has_more)
                        setData(oldData => [...oldData, ...newData])
                        setoffset(newOfset)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }, 2000);

        }
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <TextInput
                    style={styles.searchInput}
                    onChangeText={setSearchKey}
                    value={searchKey}
                    placeholder='Search...'
                />
                <TouchableOpacity
                    onPress={handleSearch}
                    style={styles.searchBtn}>
                    <Image
                        source={icons.search}
                        style={styles.iconSearch}
                    />
                </TouchableOpacity>


            </View>
        )
    }
    function renderCategory() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={[styles.cateBtn, styles.shadow]}
                    onPress={() => navigation.navigate('CategoryFilter', {
                        item
                    })}
                >
                    <Text style={{ color: '#FFFFFF', fontSize: 15 }} >{item.name}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View>
                <FlatList
                    data={options.categoryData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: 15 }}

                /></View>
        )
    }

    function renderProductList() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ marginBottom: 60 }}
                    onPress={() => navigation.navigate('ProductDetail', {
                        item
                    })}
                >
                    <View
                        style={styles.card}>
                        <Image
                            source={{ uri: `${item.thumbnail}` }}
                            resizeMode='cover'
                            style={{
                                width: '100%',
                                height: 200,
                                borderRadius: 20
                            }}
                        />
                        <View
                            style={[styles.inforCard, styles.shadow]}>
                            <Text style={styles.prodName}>{item.title}</Text>
                            <View style={{ flexDirection: 'row', paddingRight: 20 }}>
                                <Text style={{ fontSize: 15, color: 'black', }}>{item.label}</Text>
                                <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: 'grey',
                                        textDecorationLine: 'line-through',
                                    }}>${item.price}</Text>
                                    <Text style={{
                                        fontSize: 18,
                                        color: 'black',
                                        marginLeft: 30,
                                        fontWeight: 'bold'
                                    }}>${item.discount_price}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        const renderFooter = () => {
            return (
                hasMore ? <View style={{alignItems:'center'}}>
                    <ActivityIndicator size='large' color="#2980b9" />
                </View> : null
            )
        }
        return (
            <FlatList
                data={data}
                keyExtractor={(x, i) => i.toString()}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingBottom: 30
                }}
                onEndReached={() => loadData()}
                ListFooterComponent={renderFooter}
            />
        )
    }
    console.log(hasMore)


    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderCategory()}
            {renderProductList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: '#F5F5F5'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5
    },
    searchInput: {
        height: 40,
        width: Dimensions.get('window').width * 0.85,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF'
    },
    iconSearch: {
        width: 25,
        height: 25
    },
    card: {
        width: "90%",
        // height: 250,
        marginLeft: '5%',
        marginBottom: 10,
        borderRadius: 25,
        alignItems: 'center',
    },
    inforCard: {
        position: 'absolute',
        zIndex: 1,
        bottom: -50,
        width: '80%',
        borderRadius: 20,
        paddingLeft: 15,
        flexDirection: 'column',
        backgroundColor: '#D5E3EB',
        paddingBottom: 15
    },
    prodName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#192a56',
        marginTop: 5,
        marginBottom: 5
    },
    cateBtn: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#0abde3',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20
    },
    searchBtn: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        search: (searchKey) => dispatch(handleSearchData(searchKey))

    };
};
export default connect(null, mapDispatchToProps)(Home);