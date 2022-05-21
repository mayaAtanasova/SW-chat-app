import React, { forwardRef } from 'react';
import './MessageInput.css';

const MessageInput = forwardRef(({ sendMessage }, ref) => {

    return (
        <form className="chat-form">
            <input
                className="message-input"
                autoFocus
                type="text"
                placeholder="Type your message here..."
                ref={ref}
                onKeyPress={event => {
                    event.key === 'Enter' && sendMessage();
                }}
            />
            <button
                className="send-button"
                onClick={event => {
                    event.preventDefault();
                    sendMessage();
                }}
                >Send</button>
        </form>
    );
});

export default MessageInput;