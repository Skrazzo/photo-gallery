import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex, Paper, Text } from '@mantine/core';
import { IconFolders } from '@tabler/icons-react';
import { get_current_folder_files } from '../functions';
import Folder from './Small/Folder';

export default function Folders() {

    const [files, setFiles] = useState([]);
    const [path, setPath] = useState('/');
    const [currentFiles, setCurrentFiles] = useState([]);

    useEffect(() => {
        axios.get(window.baseApiUrl + 'get_files.php').then((res) => {
            if(res.status === 200){
                console.log(res.data);
                setFiles(res.data);
            }
        });
    }, []);

    

    // whenever path changes we need to update current folder files
    useEffect(() => {
        setCurrentFiles(get_current_folder_files(files, path));
    }, [path, files]);

    useEffect(() => {
        console.log('current files', currentFiles);
    }, [currentFiles]);
    
    return (
        <>
            <Paper p={'sm'} withBorder shadow={'sm'}>
                <Flex gap={5} align={'center'}>
                    <IconFolders color={'gray'} />
                    <Text fs={'italic'} c={'dimmed'}>Folders</Text>
                </Flex>
                <Flex gap={5}>
                    {currentFiles.map((x, i) => {
                        if(typeof x === 'object'){
                            return <Folder key={i} path={path + x.name + '/'} files={get_current_folder_files(files, path + x.name + '/')}/>
                        }
                    })}
                </Flex>
            </Paper>
        </>
    );
}
