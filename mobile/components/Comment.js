import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Platform, StatusBar, Dimensions, TextInput, Pressable, ScrollView } from 'react-native';
import { connect } from "react-redux";
import axios from 'axios'
import { commentReplyURL, commentURL } from '../apiURL'
import { icons } from '../constants';
import { useNavigation } from "@react-navigation/native"
import { localhost } from '../apiURL';


const Comment = forwardRef((props, ref) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        handleGetComment()
    }, []);

    useImperativeHandle(ref, () => ({

        RefGetComment() {
            handleGetComment()
        }

    }));
    const handleGetComment = () => {
        axios
            .get(commentURL(props.id))
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }
    return (
        <View>
            {data && data.map((item, i) => {
                return (
                    <View key={i}>
                        <View style={styles.commentView}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, marginRight: 10 }}>{item.User_ID}</Text>
                                <Text>{new Date(item.publish).toLocaleDateString()}</Text>
                            </View>
                            <Text style={{ fontSize: 16 }}>{item.content}</Text>
                        </View>
                        <CommentReply Comment_ID={item.id} />
                    </View>
                )
            })}
        </View>
    );
})

const CommentReply = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {

        handleGetCommentReply()

    }, [])

    // useImperativeHandle(ref, () => ({

    //     RefCommentReply() {
    //         handleGetCommentReply()
    //     }

    // }));

    const handleGetCommentReply = () => {
        axios
            .get(commentReplyURL(props.Comment_ID))
            .then(res => {
                setData(res.data)
                // console.log(data)
            })
    }

    return (
        <View>
            {data && data.map((item, i) => {
                return (
                    <View key={i} style={[styles.commentView, { marginLeft: 40, marginTop: 10 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, marginRight: 10 }}>{item.User_ID}</Text>
                            <Text>{new Date(item.publish).toLocaleDateString()}</Text>
                        </View>
                        <Text style={{ fontSize: 16 }}>{item.content}</Text>
                    </View>
                )
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    commentView: {
        width: 'auto',
        // borderWidth: 1,
        borderColor: '#bdc3c7',
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 10
    },
})

export default Comment;
