import React, { useState, useContext, useEffect, useRef } from 'react';
import ChatContext from '../../store/chat-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './ChatForm.css';
import Messages from '../Messages/Messages';
import RoomInfo from '../RoomInfo/RoomInfo';
import MessageInput from '../MessageInput/MessageInput';


const ChatForm = ({ socket }) => {
    const ctx = useContext(ChatContext);

    const [messageList, setMessageList] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);

    const inputRef = useRef();

    const sendMessage = () => {
        // if (currentMessage !== '') {
        //     await socket.emit('chatMsg', currentMessage);
        //     setCurrentMessage('');
        // }
        const message = inputRef.current.value;
        if (message !== '') {
            socket.emit('chatMsg', message);
        }
        inputRef.current.value = '';
    };

    const leaveRoom = () => {
        ctx.onLeaveRoom();
        socket.disconnect();
    };

    useEffect(() => {
        socket.on('message', data => {
            setMessageList(messageList => ([...messageList, data]));
        });
    }, [socket]);

    useEffect(() => {
        socket.on('roomUsers', ({ users }) => {
            setRoomUsers(users);
        });
    }, [socket]);

    return (
        <div className="chat-container">
            <div className='chat-header'>
                <img className='logo' src='/assets/SWlogo_s_w.png' alt='SW'
                />
                <p>StreamWorks Chat</p>
                <button
                    className='leave-room'
                    onClick={leaveRoom}>
                    <FontAwesomeIcon className='leave-icon' icon={faRightFromBracket} /> Leave Room
                </button>
            </div>
            <div className="chat-main">
                <RoomInfo
                    users={roomUsers}
                    room={ctx.user.room}
                />
                <Messages
                    className="message-container"
                    messageList={messageList}
                />
            </div>
            <div className="chat-footer">
                <MessageInput
                    ref={inputRef}
                    sendMessage={sendMessage}
                />
            </div>

        </div>
    );
};

export default ChatForm;