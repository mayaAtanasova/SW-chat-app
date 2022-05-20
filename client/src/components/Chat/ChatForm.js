import React, { useState, useContext, useEffect } from 'react';
import ChatContext from '../../store/chat-context';
import ScrollToBottom from 'react-scroll-to-bottom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import moment from 'react-moment';


const ChatForm = ({ socket }) => {
    const ctx = useContext(ChatContext);

    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            // const message = {
            //     username: ctx.user.username,
            //     text: currentMessage,
            //     time: moment().format('h:mm a'),
            // };
            console.log(currentMessage);
            await socket.emit('chatMsg', currentMessage);
            setCurrentMessage('');
        }
    };

    useEffect(() => {
        socket.on('message', data => {
            setMessageList(oldMsgs => [...oldMsgs, data]);
            console.log(messageList);

        });
    }, []);

    return (
        <>
            <div>ChatForm</div>
            <div className="chat-body">
                <button className='leave-room'>
                    <FontAwesomeIcon className='leave-icon' icon={faRightFromBracket} /> Leave Room
                </button>
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent, i) => {
                        return (
                            <div
                                className="message"
                                id={ctx.user.username === messageContent.username ? "you" : "other"}
                                key={i}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.text}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.username}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
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