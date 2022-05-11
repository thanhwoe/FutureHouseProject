import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setMessages } from "../store/actions/message";
import WebSocketInstance from "../websocket";
import { Container, Icon, Image, Dimmer, Grid, } from 'semantic-ui-react'
import ReactTimeAgo from 'react-time-ago'
import adminIMG from '../image/admin.png'
import userIMG from '../image/man.png'

const useConstructor = (callBack = () => { }) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled) return;
    callBack();
    hasBeenCalled.current = true;
}


const Chat = (props) => {
    const initialiseChat = () => {
        waitForSocketConnection(() => {
            WebSocketInstance.fetchMessages(
                props.username,
                props.match.params.chatID
            );
        });
        WebSocketInstance.connect(props.match.params.chatID);
    }
    useConstructor(() => {
        initialiseChat()
    });
    const waitForSocketConnection = (callback) => {
        setTimeout(() => {
            if (WebSocketInstance.state() === 1) {
                console.log("Connection is made");
                callback();
                return;
            } else {
                console.log("wait for connection...");
                waitForSocketConnection(callback);
            }
        }, 100);

    }
    const [message, setMessage] = useState('');
    let currentUser = props.username
    const { match: { params } } = props

    useEffect(() => {
        // WebSocketInstance.disconnect();
        waitForSocketConnection(() => {
            WebSocketInstance.fetchMessages(
                props.username,
                params.chatID
            );
        });
        WebSocketInstance.connect(params.chatID);
    }, [params.chatID]);

    const sendMessageHandler = e => {
        e.preventDefault();
        const messageObject = {
            from: props.username,
            content: message,
            chatId: props.match.params.chatID
        };
        WebSocketInstance.newChatMessage(messageObject);
        setMessage('')
    };
    const handelChange = event => {
        setMessage(event.target.value);
    };

    return (
        <Container style={{paddingTop:'20px'}}>
            <div className="chat_bg">
                <div className="chat-card">
                    <div className="chat-card-header msg_head">
                        <div className="img_cont">
                            <img src={adminIMG}
                                className="rounded-circle user_img" />
                            <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                            <span>Chat with Staff</span>
                        </div>
                    </div>

                    <div className="chat-card-body msg_card_body">

                        {props.messages && props.messages.map((item, i) => {
                            return (
                                <div key={i}>
                                    {item.author === currentUser ? (
                                        <div className="d-flex justify-content-end" >
                                            <div className="msg_cotainer_send" >
                                                {item.content}
                                                <span className="msg_time_send"><ReactTimeAgo date={Date.parse(item.timestamp)} locale="en-US" /></span>
                                            </div>
                                            <div className="img_cont_msg">
                                                <img src={userIMG}
                                                    className="rounded-circle user_img_msg" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="d-flex justify-content-start">
                                            <div className="img_cont_msg">
                                                <img src={adminIMG}
                                                    className="rounded-circle user_img_msg" />
                                            </div>
                                            <div className="msg_cotainer" >
                                                {item.content}
                                                <span className="msg_time"><ReactTimeAgo date={Date.parse(item.timestamp)} locale="en-US" /></span>
                                            </div>
                                        </div>
                                    )}

                                </div>


                            )
                        })}

                    </div>

                    <div className="chat-card-footer">
                        <div className="input-group">
                            <textarea name="" 
                            className="type_msg"
                                placeholder="Type your message..."
                                onChange={handelChange}
                                value={message}
                                required
                                />
                            <div className="input-group-append" onClick={sendMessageHandler}>
                                <span className="send_btn"><Icon name="send" /></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </Container>
    );
}
const mapStateToProps = state => {
    return {
        username: state.auth.username,
        token: state.auth.token,
        messages: state.message.messages,
    };
};

export default connect(mapStateToProps, null)(Chat);
