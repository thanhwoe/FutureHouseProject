import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput, Pressable, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'
import { orderItemDeleteURL, orderSummaryURL } from '../apiURL'
import { icons } from '../constants';
import { useNavigation } from "@react-navigation/native"
import BackNavigator from './BackNavigator';
import { localhost } from '../apiURL';

const Search = (props) => {
    const navigation = useNavigation()
    useEffect(() => {
    }, []);
    const { dataSearch, isSearch } = props;

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
                        style={{
                            width: "90%",
                            // height: 250,
                            marginLeft: '5%',
                            marginBottom: 10,
                            borderRadius: 25,
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{ uri: item.thumbnail }}
                            resizeMode='cover'
                            style={{
                                width: '100%',
                                height: 200,
                                borderRadius: 20
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                zIndex: 1,
                                bottom: -50,
                                width: '80%',
                                borderRadius: 20,
                                paddingLeft: 15,
                                flexDirection: 'column',
                                backgroundColor: '#D5E3EB',
                                paddingBottom: 15,
                                ...styles.shadow
                            }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#192a56',
                                marginTop: 5,
                                marginBottom: 5
                            }}>{item.title}</Text>

                            <View style={{
                                flexDirection: 'row',
                                paddingRight: 20
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    color: 'black',
                                }}>{item.label}</Text>
                                <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: 'grey',
                                        textDecorationLine: 'line-through',
                                    }}>${item.price}</Text>
                                    <Text style={{
                                        fontSize: 18,
                                        color: 'black',
                                        marginLeft: 30
                                    }}>${item.discount_price}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <FlatList
                data={dataSearch}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingBottom: 30
                }} />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackNavigator />
            <View style={{paddingVertical:10}}>
                <Text style={styles.header}>Result <Text style={styles.text}>- {dataSearch.length} products found</Text> </Text>
               
            </View>

            {renderProductList()}
        </SafeAreaView>
    );
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
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight:'normal'
    },
})

const mapStateToProps = state => {
    return {
        dataSearch: state.search.dataSearch,
        isSearch: state.search.loading
    }
}
export default connect(mapStateToProps, null)(Search);
