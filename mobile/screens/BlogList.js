import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Button, Alert, FlatList, Platform, StatusBar, Dimensions, TextInput, ScrollView, Pressable, Keyboard } from 'react-native';
import { icons } from '../constants';
import { postBlogURL } from '../apiURL'
import axios from 'axios'
import { connect } from 'react-redux'
import { localhost } from '../apiURL';
import { useNavigation, useRoute } from "@react-navigation/native"
import TimeAgo from 'react-native-timeago';

const BlogList = () => {
    const navigation = useNavigation()

    const [data, setData] = useState(null);
    useEffect(() => {
        handleFetchBlogList()
    }, []);
    const handleFetchBlogList = () => {
        axios
            .get(postBlogURL)
            .then(res => {
                setData(res.data)
            })
    }
    // console.log(data)
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ marginBottom: 20 }}
                onPress={() => navigation.navigate('BlogDetail', {
                    item
                })}
            >
                <View style={styles.itemView}>
                <Text style={styles.title}>{item.title}</Text>
                    <View style={{flexDirection:"row"}}>
                    <View style={styles.time}>
                        <TimeAgo time={item.timestamp} />
                    </View>
                    <Image
                        source={{ uri: item.thumbnail }}
                        resizeMode='cover'
                        style={{
                            width: 180,
                            height: 150,
                            borderRadius: 20
                        }} />
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10, flex: 1 }}>
                        <Text >{item.overview}</Text>
                        <Text style={styles.author}>By: {item.author}</Text>
                    </View>
                    </View>
                    
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.header}>Blogs</Text>
                <Image
                    source={icons.mainLogoNoText}
                    resizeMode="contain"
                    style={{ width: 50, height: 50 }}
                />
            </View>
            <FlatList
                data={data}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingBottom: 30
                }} />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: '#F5F5F5',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    headerView: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    itemView: {
        width: '100%',
        flexDirection: 'column',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        // overflow:'hidden',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        marginBottom: 5,
        marginTop:5,
        marginLeft:5
    },
    author: {
        alignSelf: 'flex-end',
        marginTop: 'auto',
        color: 'grey',
        fontWeight: 'bold'
    },
    time:{
        position:'absolute',
        zIndex:1,
        backgroundColor:'#FFFFFF',
        borderTopLeftRadius:20,
        borderBottomRightRadius:20,
        // left:5,
        // top:5,
        padding:5,
        borderWidth:1,
        // borderLeftWidth:1
    }


})

export default BlogList;
