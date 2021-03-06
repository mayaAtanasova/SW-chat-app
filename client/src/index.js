import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChatContextProvider } from './store/chat-context';
import reportWebVitals from './reportWebVitals';
import 'typeface-roboto';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.style.backgroundColor = 'rgba(5,5,5,0.9)';
window.onbeforeunload = function () {
    localStorage.clear();
};

root.render(
    <ChatContextProvider>
        <App />
    </ChatContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
