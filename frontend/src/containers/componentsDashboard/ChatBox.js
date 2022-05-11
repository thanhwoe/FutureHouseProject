import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import WebSocketInstance from '../../websocket';
import { Container, Icon, Image, Dimmer, Grid, } from 'semantic-ui-react'
import ReactTimeAgo from 'react-time-ago'
import adminIMG from '../../image/admin.png'
import userIMG from '../../image/man.png'
import mulIMG from '../../image/multiply.png'
import { chatListURL,chatDeleteURL } from '../../constants'
import { authAxios } from '../../utils';
import ChatComponent from '../components/ChatComponent';


const ChatBox = () => {
    const [data, setData] = useState([]);
    const [select, setSelect] = useState(1);
    useEffect(() => {
        getChatList()
    }, []);
    const getChatList = () => {
        authAxios
            .get(chatListURL)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handelSelect = (id)=>{
        setSelect(id)
        WebSocketInstance.disconnect();

    }
    const handleDeleteChat=(id)=>{
        authAxios
        .delete(chatDeleteURL(id))
        .then(res=>{
            console.log(res)
            getChatList()
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <Container style={{ paddingTop: '20px' }}>
            <div className="chat_bg">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>

                            <div className="chat-card contacts_card">
                                <div className="contacts_body">
                                    <ul className="contacts">
                                        {data && data.map(item => {
                                            return (
                                                <li className={select == item.id ? 'active_contact': null} key={item.id}>
                                                    <div className="d-flex" onClick={()=>handelSelect(item.id)}>
                                                        <div className="img_cont">
                                                            <img src={userIMG} className="rounded-circle user_img" />
                                                        </div>
                                                        <div className="user_info">
                                                            <span>{item.participants.at(-1)}</span>
                                                        </div>
                                                        <div style={{marginLeft:'auto',marginRight:0}} onClick={()=>handleDeleteChat(item.id)}>
                                                            <img src={mulIMG} className=" img_delete" />
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}

                                    </ul>
                                </div>
                                <div className="chat-card-footer"></div>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <ChatComponent chatID={select} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

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


export default connect(mapStateToProps, null)(ChatBox);
