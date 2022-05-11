import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { authAxios } from '../../utils';
import { withRouter, Link } from "react-router-dom";
import { chatCreateURL } from '../../constants';

const ChatButton = (props) => {
    const [userStaff, setUserStaff] = useState('admin')
    const handleSubmit = () => {
            const combined = [userStaff, props.username];
            authAxios
                .post(chatCreateURL, {
                    messages: [],
                    participants: combined
                })
                .then(res => {
                    props.history.push(`/chat/${res.data.id}`);
                    props.getUserChats(props.username);
                })
                .catch(err => {
                    console.error(err);
                });
    };
    return (
        <div className="chat-button" onClick={handleSubmit}>
            <span>Chat</span>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        username: state.auth.username
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getUserChats: (username) =>
            dispatch(messageActions.getUserChats(username))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatButton));
