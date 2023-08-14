import { Button, Container, Paper, Text, Flex } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import React, { useState } from 'react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';

export default function Options() {
    const [generateLoading, setGenerateLoading] = useState(false);
    const [loginCheckResult, setLoginCheckResult] = useState({logged_in: false, login_req: false});
    const filemanagerURL = process.env.REACT_APP_FILE_MANAGER_URL;

    

    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = window.baseApiUrl;

    function generateThumbnails(){
        setGenerateLoading(true);

        axios.get('run_thumb.php').then((res) => {
            if(res.status === 200){
                console.log('PHP response:', res.data);
                notifications.show({
                    title: 'System status',
                    message: 'Changes to thumbnails have been made, if browser does not refresh please refresh it!',
                    color: 'green',
                });

                setGenerateLoading(false);
                window.location.reload();   
            }else{
                notifications.show({
                    title: 'System ERROR',
                    message: 'PHP error happened, please check console for more information!',
                    color: 'red',
                });
                console.error('PHP error:', res);
            }
        });
    }

    function check_login(){
        setGenerateLoading(true);

        axios.get('check_login.php').then(res => {
            if(res.status === 200){
                if(typeof res.data === 'object'){
                    console.log(res.data);
                    setLoginCheckResult(res.data);
                    setGenerateLoading(false);
                }else{
                    console.error(res.data);
                }
            }
        }).catch(err =>{
            console.error(err);

        });

        
    }
    
    return (
        <Container>
            

            <Paper withBorder shadow={'sm'} p={5}>
                <Text c={'dimmed'} fs={'italic'} mb={10}>Thumbnail operations</Text>
                <Button loading={generateLoading} onClick={generateThumbnails} leftIcon={<IconRefresh size={20}/>} size={'xs'}>Regenerate thumbnails</Button>
            </Paper>

            <Paper withBorder shadow={'sm'} p={5}>
                <Text c={'dimmed'} fs={'italic'} mb={10}>Open file-manager</Text>
                <Button onClick={() => {window.open(filemanagerURL, '_blank');}} leftIcon={<IconRefresh size={20}/>} size={'xs'}>Open your file-manager</Button>
            </Paper>


            <Paper withBorder shadow={'sm'} p={5} mt={10}>
                <Text c={'dimmed'} fs={'italic'}>Check login</Text>
                <Paper withBorder my={10} p={5}>
                    <Flex direction={'column'} gap={7} className={'text-font'}>
                        <span>• Login required - {(loginCheckResult.login_req) ? 'true' : 'false'}</span>
                        <span>• Logged in - {(loginCheckResult.logged_in) ? 'true' : 'false'}</span>
                    </Flex>
                </Paper>
                <Button loading={generateLoading} onClick={check_login} leftIcon={<IconRefresh size={20}/>} size={'xs'}>Request login check</Button>
            </Paper>
        </Container>
    )
}
