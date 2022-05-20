import React, { useState, useContext } from 'react';
import ChatContext from '../../store/chat-context';
import './JoinForm.css';


const JoinForm = ({ socket }) => {
    const [username, setUsername] = useState('Anonymous');
    const [room, setRoom] = useState('');

    const ctx = useContext(ChatContext);

    const joinRoom = (ev) => {
        ev.preventDefault();

        if (room !== '') {
            console.log(username, room);
            ctx.onJoinRoom({ username, room });
            socket.emit('joinRoom', { username, room });
        }
    };

    return (
        <div className='chat-container'>
            <div className='form-header'>
                <img className='logo' src='/assets/SWlogo_s_w.png' alt='SW'
                />
                <p>StreamWorks Chat</p>
            </div>
            <div className='form-container'>
                <form className='join-form'>
                    <label>Username</label>
                    <input placeholder='Username...' onChange={(ev) => setUsername(ev.target.value)} />
                    <label>Room</label>
                    <input placeholder='Room...' onChange={(ev) => setRoom(ev.target.value)} />
                    <button onClick={joinRoom}>Join Chat</button>
                </form>
            </div>
        </div>

    );
};

export default JoinForm;