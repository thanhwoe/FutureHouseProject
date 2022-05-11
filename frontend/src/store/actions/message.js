import {authAxios} from "../../utils"
import { localhost } from "../../constants";
import * as actionTypes from "./actionTypes";


export const addMessage = message => {
    return {
      type: actionTypes.ADD_MESSAGE,
      message: message
    };
  };
  
  export const setMessages = messages => {
    return {
      type: actionTypes.SET_MESSAGES,
      messages: messages
    };
  };
  
  const getUserChatsSuccess = chats => {
    return {
      type: actionTypes.GET_CHATS_SUCCESS,
      chats: chats
    };
  };
  
  export const getUserChats = (username) => {
    return dispatch => {
      authAxios
        .get(`${localhost}/chat/?username=${username}`)
        .then(res => dispatch(getUserChatsSuccess(res.data)));
    };
  };