import React, { useState, useEffect } from 'react';

const ChatContext = React.createContext({
    isJoined: false,
    user: {},
    onJoinRoom: (username, room) => { },
    onLeaveRoom: () => { }
});

export const ChatContextProvider = (props) => {
    const [isJoined, setIsJoined] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
        if(user && user.room) {
            setIsJoined(true);
            setUser(user);
        }
    }, []);

    const joinHandler = (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        setIsJoined(true);
        setUser(data);
    };

    const leaveHandler = () => {
        localStorage.removeItem('user');
        setIsJoined(false);
        window.location.reload(false);
    };

    return (
        <ChatContext.Provider
            value={{
                isJoined,
                user,
                onJoinRoom: joinHandler,
                onLeaveRoom: leaveHandler,
            }}
        >
            {props.children}
        </ChatContext.Provider>
    );
};

export default ChatContext;