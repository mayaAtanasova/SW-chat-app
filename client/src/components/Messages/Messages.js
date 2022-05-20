import React, { useContext } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatContext from '../../store/chat-context';

const Messages = ({messageList}) => {
    console.log(messageList);
    const ctx = useContext(ChatContext);
    const username = ctx.user.username;
    return (
        <ScrollToBottom className="message-container">
        {messageList.map((messageContent, i) => {
            return (
                <div
                    className="message"
                    id={username === messageContent.username ? "you" : "other"}
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
    );
};

export default Messages;