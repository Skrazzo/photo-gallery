import { Button, Container, Paper, Text } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import React, { useState } from 'react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';

export default function Options() {
    const [generateLoading, setGenerateLoading] = useState(false);

    function generateThumbnails(){
        setGenerateLoading(true);

        axios.get(window.baseApiUrl + 'run_thumb.php').then((res) => {
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
    
    return (
        <Container>
            <Paper withBorder shadow={'sm'} p={5}>
                <Text c={'dimmed'} fs={'italic'} mb={10}>Thumbnail operations</Text>
                <Button loading={generateLoading} onClick={generateThumbnails} leftIcon={<IconRefresh size={20}/>} size={'xs'}>Regenerate thumbnails</Button>
            </Paper>
        </Container>
    )
}
