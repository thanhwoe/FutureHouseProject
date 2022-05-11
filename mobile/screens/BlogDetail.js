import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Button, Alert, FlatList, Platform, StatusBar, Dimensions, TextInput, ScrollView, Pressable, Keyboard, useWindowDimensions } from 'react-native';
import { icons } from '../constants';
import { postDetailBlogURL } from '../apiURL'
import axios from 'axios'
import { connect } from 'react-redux'
import { localhost } from '../apiURL';
import { useNavigation, useRoute } from "@react-navigation/native"
import BackNavigator from '../components/BackNavigator';
import RenderHtml from 'react-native-render-html';

const BlogDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { width } = useWindowDimensions();
    let { item } = route.params
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        handleFetchItem()
    }, []);

    const handleFetchItem = () => {
        axios
            .get(postDetailBlogURL(item.id))
            .then(res => {
                setData(res.data)
                setLoading(false)

            })
            .catch(err => {
            });

    }

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>Loading</Text>
                </View>
            </SafeAreaView>
        )
    } else {
        const param = data.content.replace("/media/uploads/", `${localhost}/media/uploads/`)
        const source = {
            html: param
        };
        return (
            <SafeAreaView style={styles.container}>
                <BackNavigator />
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 30 }}>
                        <Image
                            source={{ uri: item.thumbnail }}
                            resizeMode='cover'
                            style={{
                                width: '100%',
                                height: 200,
                                borderRadius: 20
                            }} />
                        <Text style={styles.author}>By: {item.author}</Text>
                        <Text style={styles.title}>{item.title}</Text>
                        <View>
                            <RenderHtml
                                contentWidth={width}
                                source={source}
                            />
                        </View>
                    </View>
                </ScrollView>

            </SafeAreaView>
        );
    }

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
        flexDirection: 'row',
        borderRadius: 20,
        // overflow:'hidden',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    author: {
        alignSelf: 'flex-start',
        color: 'grey',
        fontWeight: 'bold'
    }


})


export default BlogDetail;
