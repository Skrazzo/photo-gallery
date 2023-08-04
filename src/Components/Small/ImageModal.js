import React from 'react';
import './ImageModal.css';


export default function ImageModal(props) {
    return (
        <div className='overlay'>
            <div className='image-modal-container'>

            {props.link}
            </div>
        </div>
    )
}
