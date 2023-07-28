import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex, Image } from '@mantine/core';


export default function All() {
    const [thumbnails, setThumbnails] = useState([]);


    useEffect(() => {
        axios.get(window.baseApiUrl + 'get_all_files.php').then((x) => {
            setThumbnails(x.data);
        });

    }, []);
    
    return (
        <Flex gap={5} wrap={'wrap'} >
            {thumbnails.map((x) => {
                return <Image radius={'sm'}  width={100} src={window.baseThumbUrl + x.path}/>;
            })}
        </Flex>
    )
}
