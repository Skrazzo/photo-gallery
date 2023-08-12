import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Center, Collapse, Flex, Image, Pagination, Paper, Text, Container, Breadcrumbs, Button, ThemeIcon, ScrollArea } from '@mantine/core';
import { IconChevronDown, IconChevronLeft, IconFolders, IconHome } from '@tabler/icons-react';
import { calculate_phone_image_size, check_folder_exists, check_if_thumb_exists, getFileNameFromPath, get_current_folder_files, get_images_from_array } from '../functions';
import Folder from './Small/Folder';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import ImageModal from './Small/ImageModal';

export default function Folders() {

    const [files, setFiles] = useState([]);
    const [path, setPath] = useState('/');
    const [currentFiles, setCurrentFiles] = useState([]);
    const [foldersCollapse, setFolderCollapse] = useDisclosure(true);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [phoneImageSize, setPhoneImageSize] = useState(100);
    const phoneSize = useMediaQuery('(max-width: 450px)');
    const [breadcrumbsPath, setbreadcrumbsPath] = useState([]);
    const [imageModal, setImageModal] = useState({open: false, link: ''});

    useEffect(() => {
        axios.get(window.baseApiUrl + 'get_files.php').then((res) => {
            if(res.status === 200){
                setFiles(res.data);
            }

            console.log(res.status);
        });
    }, []);

        

    // whenever path changes we need to update current folder files
    useEffect(() => {
        
        
        setCurrentFiles(get_current_folder_files(files, path));
        
        var tmp = path.split('/').map((item, index) => {
            
            if(item !== ''){
                return (
                    <Button compact onClick={() => {set_breadcrumb_path(index)}} variant={'subtle'} key={index}>
                        {item}
                    </Button>
                );
            }
        });

        setbreadcrumbsPath(tmp);
    }, [path, files]);

    useEffect(() => {
        console.log('current images', get_images_from_array(currentFiles));
        console.log('current files', currentFiles);

        setImages(get_images_from_array(currentFiles));
    }, [currentFiles]);

    
    useEffect(() => {
        setPhoneImageSize(calculate_phone_image_size(10));
    }, [window.innerWidth]);
    
    function get_path(path, index){
        var tmpPaths = path.split('/');
        var tmp = '/';
        //console.log(path, index);
        for(var i = 0; i <= index; i++){
            if(tmpPaths[i] !== ''){
                tmp += tmpPaths[i] + '/';
            }
        }

        
        return tmp;
    }

    function set_breadcrumb_path(index){
        setPath(get_path(path, index));
    }

    function viewClickHandler(link){
        setImageModal({link: link, open: true});
    }

    function closeViewHandler(){
        setImageModal({...imageModal, open: false});
    }

    function viewNextImage(){
        const i = images.indexOf(getFileNameFromPath( imageModal.link));

        if(i !== images.length - 1){
            setImageModal({...imageModal, link: path + images[i + 1]});
        }
    }   

    function viewBeforeImage(){
        const i = images.indexOf(getFileNameFromPath( imageModal.link));

        if(i !== 0){
            setImageModal({...imageModal, link: path + images[i - 1]});
        }
    }

    return (
        <Container p={0}>
            {(imageModal.link !== '')? 
                <ImageModal next={viewNextImage} before={viewBeforeImage} close={closeViewHandler} open={imageModal.open} link={imageModal.link}/> : <></>
            }

            <Flex gap={5}>
                <ThemeIcon variant={'light'}>
                    <IconHome onClick={() => {setPath('/')}}/>
                </ThemeIcon>
                <ScrollArea w={'100%'}>
                    <Breadcrumbs >{breadcrumbsPath}</Breadcrumbs>
                </ScrollArea>
            </Flex>

            {(currentFiles.filter(x => typeof x === 'object').length !== 0) ? 
                <Paper p={'sm'} withBorder shadow={'sm'}>
                    <Flex justify={'space-between'} onClick={setFolderCollapse.toggle}>
                        <Flex gap={5} align={'center'}>
                            <IconFolders color={'gray'} />
                            <Text fs={'italic'} c={'dimmed'}>Folders</Text>
                        </Flex>
                        
                        {(foldersCollapse) ? <IconChevronDown /> : <IconChevronLeft />}
                    </Flex>


                    <Collapse in={foldersCollapse}>
                        
                        <Flex gap={10} mt={'sm'} wrap={'wrap'} justify={'space-evenly'}>
                            {currentFiles.map((x, i) => {
                                if(typeof x === 'object'){
                                    
                                    if(check_folder_exists(get_current_folder_files(files, path), x.name)){

                                        return <Folder key={i} setPath={() => {setPath(path + x.name + '/')}}  path={path + x.name + '/'} name={x.name} files={get_current_folder_files(files, path + x.name + '/')}/>
                                    }
                                    
                                }
                            })}
                        </Flex>
                    </Collapse>
                </Paper> : <></>
            }

                

            
                    
            <Flex gap={5} wrap={'wrap'} mt={'sm'} justify={'center'} className='folders-image-container'>
                {images.map((x, i) => {

                    if(i < (((!phoneSize) ? window.imagesPerPage : window.imagesPerPagePhone) * page) && i >= (((!phoneSize) ? window.imagesPerPage : window.imagesPerPagePhone) * (page - 1))){ // check if image is valid for pagination
                        const picturePathThumb = path + x;
                        if(check_if_thumb_exists(files, picturePathThumb)){
                            return <Image onClick={() => viewClickHandler(picturePathThumb)} key={i} width={(phoneSize) ? phoneImageSize : window.imageSize} radius={'sm'}  src={window.baseThumbUrl + picturePathThumb}/>;
                        }
                    }
                    
                })}
            </Flex>
            
            <Center mt={20}>
                <Pagination size={'sm'} total={Math.ceil(images.length / ((!phoneSize) ? window.imagesPerPage : window.imagesPerPagePhone))} onChange={setPage} defaultValue={page} siblings={window.paginationSiblings} boundaries={window.paginationBoundaries}/>
            </Center>
        </Container>
    );
}
