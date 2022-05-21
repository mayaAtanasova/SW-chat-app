import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
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
                >
                    <FontAwesomeIcon className="fa-icon" icon={faPaperPlane}/>
                    <p>Send</p>
                    </button>
        </form>
    );
});

export default MessageInput;