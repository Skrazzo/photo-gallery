import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Center, Container, Flex, Image, Pagination } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { calculate_phone_image_size } from '../functions';
import { useMediaQuery } from '@mantine/hooks';
import ImageModal from './Small/ImageModal';


export default function All() {
    const [thumbnails, setThumbnails] = useState([]);
    const [phoneImageSize, setPhoneImageSize] = useState(100);
    const phoneSize = useMediaQuery('(max-width: 450px)');
    const [page, setPage] = useState(1);

    const [imageModal, setImageModal] = useState({open: false, link: ''});


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
                            });
                            
                            window.location.reload();   
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

    function viewClickHandler(link){
        setImageModal({link: window.baseApiUrl + 'view_image.php?path=' + link, open: true});
    }

    function closeViewHandler(){
        setImageModal({...imageModal, open: false});
    }

    useEffect(() => {
        refresh_thumbnails();
        check_changes();

    }, []);

    useEffect(() => {
        setPhoneImageSize(calculate_phone_image_size(10));
    }, [window.innerWidth]);
    
    return (
        <>
            <Container p={0}>
                {(imageModal.link !== '')? 
                    <ImageModal close={closeViewHandler} open={imageModal.open} link={imageModal.link}/> : <></>
                }
                
                <Flex gap={5} wrap={'wrap'} justify={'center'}>
                    {thumbnails.map((x, i) => {
                        if(i < (((!phoneSize) ? window.imagesPerPage : window.imagesPerPagePhone) * page) && i >= (((!phoneSize) ? window.imagesPerPage : window.imagesPerPagePhone) * (page - 1))){ // check if image is valid for pagination
                            return <Image onClick={() => viewClickHandler(x.path)}  width={(phoneSize) ? phoneImageSize : window.imageSize} radius={'sm'}  src={window.baseThumbUrl + x.path}/>;
                        }
                    })}
                </Flex>
                
                <Center mt={20}>
                    <Pagination size={'sm'} total={Math.ceil(thumbnails.length / ((!phoneSize) ? window.imagesPerPage : window.imagesPerPagePhone))} onChange={setPage} defaultValue={page} siblings={window.paginationSiblings} boundaries={window.paginationBoundaries}/>

                </Center>
            </Container>
            
        </>
    )
}
