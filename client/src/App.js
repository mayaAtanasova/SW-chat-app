import React, { useContext } from 'react';
import io from 'socket.io-client';
import JoinForm from './components/JoinForm/JoinForm';
import ChatForm from './components/Chat/ChatForm';
import ChatContext from './store/chat-context';

const socket = io.connect('http://localhost:3001');

function App() {

  const ctx = useContext(ChatContext);
  console.log(ctx.isJoined);

  return (
    <>
      {!ctx.isJoined && <JoinForm socket={socket}/>}
        {ctx.isJoined && <ChatForm socket={socket}/>}
    </>
  );
}

export default App;
