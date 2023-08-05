import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

window.baseApiUrl = 'http://192.168.8.166/home/photos/';
window.baseThumbUrl = 'http://192.168.8.166/home/photos/thumb/';



//domain_detect();

function domain_detect(){
    const currentDomain = window.location.hostname;
    const protocol = window.location.protocol;


    window.baseApiUrl   = protocol + '//'+ currentDomain +'/home/photos/'; 
    window.baseThumbUrl = protocol + '//'+ currentDomain +'/home/photos/thumb/';
}


// settings for pagination
window.imagesPerPage = 54;
window.imagesPerPagePhone = 24;
window.paginationSiblings = 2; // pages in the middle
window.paginationBoundaries = 1; // pages from both sides

// all picture settings
window.imagesPerRowPhone = 4; // how many images to show per row on phone
window.imageSize = 100; // image size when viewed normaly

root.render(
    <MantineProvider
        theme={{ colorScheme: 'light', primaryColor: 'green' }}
    >
        <Notifications />
        <App />
    </MantineProvider>
);

