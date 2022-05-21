import React, { useContext } from 'react';
import ChatContext from '../../store/chat-context';
import './Message.css';

const Message = ({ content }) => {
    const ctx = useContext(ChatContext);
    return (
        <div
            className={`message ${ctx.user.username === content.username ? 'me' : 'other'} ${content.username === 'SW Admin' ? 'admin' : null}`}
        >
            <p className="message-author">{content.username}</p>
            <p className="message-content">{content.text}</p>
            <p className="message-time">{content.time}</p>
        </div>
    );
};

export default Message;