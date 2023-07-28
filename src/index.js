import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

window.baseApiUrl = 'http://192.168.8.166/home/photos/';
window.baseThumbUrl = 'http://192.168.8.166/home/photos/thumb/';


root.render(
    <App />
);

