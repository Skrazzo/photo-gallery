import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Center, Container, Flex, Image, Pagination } from '@mantine/core';
import { notifications } from '@mantine/notifications';


export default function All() {
    const [thumbnails, setThumbnails] = useState([]);
    const [page, setPage] = useState(1);

    function check_changes(){
        axios.get(window.baseApiUrl + 'detect_changes.php').then((x) => {
            if(x.status === 200){
                if(x.data === true){
                    notifications.show({
                        title: 'System status',
                        loading: true,
                        message: 'We detected few changes, we are updating thumbnails, please wait a bit',
                    })

                    axios.get(window.baseApiUrl + 'run_thumb.php').then((res) => {
                        if(res.status === 200){
                            console.log('PHP response:', res.data);
                            notifications.show({
                                title: 'System status',
                                message: 'Changes to thumbnails have been made, if browser does not refresh please refresh it!',
                                color: 'green',
                            })      
                        }else{
                            console.error('PHP error:', res);
                        }
                    });
                }
            }
        });
    }

    function refresh_thumbnails(){
        axios.get(window.baseApiUrl + 'get_all_files.php').then((x) => {
            setThumbnails(x.data);
        });
    }

    useEffect(() => {
        refresh_thumbnails();
        check_changes();

    }, []);
    
    return (
        <>
            <Container>

                <Flex gap={5} wrap={'wrap'} justify={'center'}>
                    {thumbnails.map((x, i) => {
                        if(i < (window.imagesPerPage * page) && i >= (window.imagesPerPage * (page - 1))){ // check if image is valid for pagination
                            return <Image radius={'sm'}  width={100} src={window.baseThumbUrl + x.path}/>;
                        }
                    })}
                </Flex>
                
                <Center mt={20}>
                    <Pagination total={Math.floor(thumbnails.length / window.imagesPerPage)} onChange={setPage} defaultValue={page} siblings={window.paginationSiblings}/>

                </Center>
            </Container>
            
        </>
    )
}
