import { Center, Image, SimpleGrid, Text } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import React, { useState } from 'react';
import './Folder.css';
import { useMediaQuery } from '@mantine/hooks';

export default function Folder(props) {
    
    const phoneSize = useMediaQuery('(min-width: 450px)');
    const [imageSize, setImageSize] = useState(100);
    
    var images = props.files.filter(x => {
        return typeof x === 'string';
    });
    images.splice(4);

    function onClickHandler(){
        images = [];
        props.setPath();
    }
    
    return (
        <div onClick={onClickHandler} style={{maxWidth: (phoneSize) ? (imageSize * 2 + 3) + 'px' : 'calc(50% - 5px)'}}>
            <SimpleGrid cols={2} spacing={1} verticalSpacing={1} style={{backgroundColor: 'rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.1)'}} className={'folder-container'}>
            
                {(images[0] === undefined) ? <Center w={imageSize} h={imageSize} style={{backgroundColor: '#FFFFFF'}} ><IconPhoto color={'gray'}/></Center> : 
                    <Image width={imageSize} style={{backgroundColor: '#FFFFFF'}} src={window.baseThumbUrl + '/' + props.path + '/' + images[0]}/>
                }

                {(images[1] === undefined) ? <Center w={imageSize} h={imageSize} style={{backgroundColor: '#FFFFFF'}}><IconPhoto color={'gray'}/></Center> : 
                    <Image width={imageSize} style={{backgroundColor: '#FFFFFF'}} src={window.baseThumbUrl + '/' + props.path + '/' + images[1]}/>
                }

            
                {(images[2] === undefined) ? <Center w={imageSize} h={imageSize} style={{backgroundColor: '#FFFFFF'}}><IconPhoto color={'gray'}/></Center> : 
                    <Image width={imageSize} style={{backgroundColor: '#FFFFFF'}} src={window.baseThumbUrl + '/' + props.path + '/' + images[2]}/>
                }

                {(images[3] === undefined) ? <Center w={imageSize} h={imageSize} style={{backgroundColor: '#FFFFFF'}}><IconPhoto color={'gray'}/></Center> : 
                    <Image width={imageSize} style={{backgroundColor: '#FFFFFF'}} src={window.baseThumbUrl + '/' + props.path + '/' + images[3]}/>
                }

            </SimpleGrid>
            <Text lineClamp={2} align='center' mt={5}>{props.name}</Text>
            
        </div>

    );
}
