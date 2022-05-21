import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';
import './Messages.css';

const Messages = ({ messageList }) => {
    return (
        <ScrollToBottom className="message-container">
            {messageList.map((messageContent, i) => (
                <div key={i} className="message-wrapper">
                    <Message content={messageContent}  />
                </div>
            ))}
        </ScrollToBottom>
    );
};

export default Messages;