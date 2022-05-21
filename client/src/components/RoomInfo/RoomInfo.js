import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';


import './RoomInfo.css';


const RoomInfo = ({ users, room }) => {

    return (
        <div className="room-data">
            <div className="room-name">
                <div>
                    <p>Room</p>
                    <FontAwesomeIcon icon={faCommentDots} />
                </div>
                <div>{room}</div>
            </div>
            <div className="users">
                <div className="users-name">
                    <p>Users</p>
                    <FontAwesomeIcon icon={faPeopleRoof} />
                </div>
                <div className="users-count"> {users.length} users</div>
                <ScrollToBottom className="users-container">
                    {users && users.map((user) => (
                    <div 
                    className='users-list'
                    key={user.id}>
                        <FontAwesomeIcon className="person-icon" icon={faUserCheck}/>
                        <p>{user.username}</p>
                        </div>))
                    }
                </ScrollToBottom>
            </div>
        </div>
    );
};

export default RoomInfo;