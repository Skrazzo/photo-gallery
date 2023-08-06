import { Button, CloseButton, ThemeIcon } from '@mantine/core';
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconBadgeHd, IconDownload, IconRotateClockwise } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import './ImageModal.css';
import ColorThief from 'colorthief';

export default function ImageModal(props) {
    const [bgColor, setBgColor] = useState('white'); // Initial background color
    const [bgColorL, setBgColorL] = useState('white'); // Initial lighter background color
    const [bgColorA, setBgColorA] = useState('rgba(0,0,0,0.3)'); // Initial background color
    const [rgbColor, setRgbColor] = useState([0, 0, 0]);
    const [hdPicture, setHdPicture] = useState(false);
    const [imageAngle, setimageAngle] = useState(0);

    useEffect(() => {
        const img = document.querySelector('.modal-image');
        const colorThief = new ColorThief();
        setimageAngle(0);
        
        img.addEventListener('load', function() {
            const tmp = colorThief.getColor(img);

            setRgbColor((isColorBright(tmp)) ? darkenColor(tmp, 0.4) : darkenColor(tmp, 0.1));
            
        });
        
        
    }, [props.link]);

    useEffect(() => {
        const lighterRGB = lightenColor(rgbColor);
        setBgColorL('rgb('+ lighterRGB[0] +', '+ lighterRGB[1] +', '+ lighterRGB[2] +')');

        setBgColor('rgb('+ rgbColor[0] +', '+ rgbColor[1] +', '+ rgbColor[2] +')');
        setBgColorA('rgba('+ rgbColor[0] +', '+ rgbColor[1] +', '+ rgbColor[2] +', 0.4)');
    }, [rgbColor]);

    function getFileNameFromPath(filePath) {
        // Use the built-in JavaScript method to extract the file name
        return filePath.split('/').pop();
    }

    function isColorBright(rgbArray, threshold = 128) {
        // Ensure the input is a valid RGB array
        if (!Array.isArray(rgbArray) || rgbArray.length !== 3) {
          throw new Error('Invalid RGB array');
        }
      
        // Calculate luminance using the formula: L = 0.299R + 0.587G + 0.114B
        const luminance = 0.299 * rgbArray[0] + 0.587 * rgbArray[1] + 0.114 * rgbArray[2];
      
        // Compare luminance against the threshold to determine brightness
        return luminance > threshold;
    }

    function darkenColor(rgbArray, darknessFactor = 0.5) {
        // Ensure the input is a valid RGB array
        if (!Array.isArray(rgbArray) || rgbArray.length !== 3) {
          throw new Error('Invalid RGB array');
        }
      
        // Ensure the darkness factor is within the valid range [0, 1]
        if (darknessFactor < 0 || darknessFactor > 1) {
          throw new Error('Darkness factor should be between 0 and 1');
        }
      
        // Calculate the new darker RGB values
        const darkerRgbArray = rgbArray.map(value => Math.max(0, Math.round(value - value * darknessFactor)));
      
        return darkerRgbArray;
    }

    function lightenColor(rgbArray, factor = 0.2) {
        // Ensure the input is a valid RGB array
        if (!Array.isArray(rgbArray) || rgbArray.length !== 3) {
          throw new Error('Invalid RGB array');
        }
      
        // Calculate the new RGB values by adding the factor to each component
        const newR = Math.min(255, rgbArray[0] + Math.round(255 * factor));
        const newG = Math.min(255, rgbArray[1] + Math.round(255 * factor));
        const newB = Math.min(255, rgbArray[2] + Math.round(255 * factor));
      
        return [newR, newG, newB];
    }

    function toggleHDHandler(){
        setHdPicture(!hdPicture);
    }

    function rotate(){
        setimageAngle(imageAngle + 90);
    }

    if(props.open === true){
        return (
            <div className='overlay' style={{backgroundColor: bgColorA}}>
                
                <div className='image-modal-container' style={{ background: 'linear-gradient(to bottom, '+ bgColorL +', '+ bgColor +')'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}} >
                        <div className='flex-center text-font' style={{
                            color: (isColorBright(rgbColor)) ? 'black' : 'white'
                        }}>{getFileNameFromPath(props.link)} <ThemeIcon onClick={toggleHDHandler} variant={(hdPicture) ? 'filled' : 'outline'}><IconBadgeHd size={20} /></ThemeIcon> </div>
                        <CloseButton onClick={props.close} size={'md'} title="Close image view"  />
                    </div>
                    
                    <div className='image-modal-center'>
                        <img style={{rotate: imageAngle + 'deg'}} className={'modal-image'} src={(hdPicture) ? window.baseApiUrl + 'view_image_hd.php?path=' + props.link : window.baseApiUrl + 'view_image.php?path=' + props.link} alt={'Image is loadin...'} crossOrigin="anonymous"/>
                    </div>

                    <div className='image-modal-controls'>
                        <IconArrowNarrowLeft style={{zIndex: 90000}} onClick={props.before} color={(isColorBright(rgbColor)) ? 'black' : 'white'}/>
                        <IconRotateClockwise style={{zIndex: 90000}} onClick={rotate} color={(isColorBright(rgbColor)) ? 'black' : 'white'}/>
                        <IconArrowNarrowRight style={{zIndex: 90000}} onClick={props.next} color={(isColorBright(rgbColor)) ? 'black' : 'white'}/>
                    </div>
                    
                </div>
            </div>
        )

    }
}
