import { socket_url } from './constants';
import { w3cwebsocket as W3CWebSocket } from "websocket";
class WebSocketService {
    static instance = null;
    callbacks = {};
    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }
    constructor() {
        this.socketRef = null;
    }
    connect(chatUrl) {
        const path = `${socket_url}/ws/chat/${chatUrl}/`;
        this.socketRef = new WebSocket(path); 
        // this.socketRef = new W3CWebSocket(path);
        this.socketRef.onopen = () => {
            console.log("WebSocket open");
        }

        // this.socketNewMessage(JSON.stringify({
        //     command:'fetch_messages'
        // }))

        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data)

        }
        this.socketRef.onerror = e => {
            console.log(e.message);
        }
        this.socketRef.onclose = () => {
            console.log("WebSocket closed. Reconnecting...");
            this.connect()
        }

    }
    disconnect() {
        this.socketRef.close()
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data)
        const command = parsedData.command
        if (Object.keys(this.callbacks).length === 0) {
            return
        }
        if (command === 'messages') {
            this.callbacks[command](parsedData.messages)
        }
        if (command === 'new_message') {
            this.callbacks[command](parsedData.message)
        }
    }

    fetchMessages(username, chatId) {
        this.sendMessage({
            command: 'fetch_messages',
            username: username,
            chatId: chatId
        })
    }

    newChatMessage(message) {
        this.sendMessage({
            command: 'new_message',
            from: message.from,
            message: message.content,
            chatId: message.chatId
        })
    }

    addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
    }

    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify({ ...data }))
        } catch (err) {
            console.log(err.message);
        }
    }

    state() {
        return this.socketRef.readyState;
    }
    // waitForSocketConnection(callback){
    //     const socket = this.socketRef;
    //     const recursion = this.waitForSocketConnection;
    //     setTimeout(
    //         function(){
    //             if(socket.readyState ===1){
    //                 if(callback !=null){
    //                     callback()
    //                 }
    //                 return;
    //             }else{
    //                 recursion(callback)
    //             }
    //         },1
    //     )
    // }

}
const WebSocketInstance = WebSocketService.getInstance();
export default WebSocketInstance;