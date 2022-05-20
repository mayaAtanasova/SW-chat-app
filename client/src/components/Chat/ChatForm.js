import React, { useState, useContext, useEffect } from 'react';
import ChatContext from '../../store/chat-context';
import ScrollToBottom from 'react-scroll-to-bottom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './ChatForm.css';
import Messages from '../Messages/Messages';
import RoomInfo from '../RoomInfo/RoomInfo';


const ChatForm = ({ socket }) => {
    const ctx = useContext(ChatContext);
    const username = ctx.user.username;

    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            await socket.emit('chatMsg', currentMessage);
            setCurrentMessage('');
        }
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
        socket.on('roomUsers', data => {
            setRoomUsers(oldUsers => [...oldUsers, data]);
        });
    }, [socket]);

    return (
        <>
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
                    <RoomInfo roomUsers={roomUsers} room={ctx.user.room} />
                    <Messages messageList={messageList} username={username} />
                </div>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Input your message here..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === 'Enter' && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </>
    );
};

export default ChatForm;