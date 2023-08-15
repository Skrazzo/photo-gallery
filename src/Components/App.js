import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs } from '@mantine/core';
import All from './All';
import { IconPhoto, IconFolders, IconAdjustmentsAlt} from '@tabler/icons-react';
import Folders from './Folders';
import Options from './Options';
import Login from './Login';

export default function App() {
    const [showLogin, setShowLogin] = useState(null);

    axios.defaults.baseURL = window.baseApiUrl;
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('check_login.php').then(res => {
            if(res.status === 200){
                if(typeof res.data === 'object'){
                    if(res.data.login_req === true && res.data.logged_in === false){
                        setShowLogin(true);
                    }else if(res.data.logged_in === true){
                        setShowLogin(false);
                    }else if(res.data.login_req === false){
                        setShowLogin(false);
                    }



                }else{
                    console.error(res.data);
                }
            }
        }).catch(err =>{
            console.error(err);
        });
    }, []);
    
    if(showLogin || showLogin === null){
        return (
            <Login />
        );
    }else{
        return (
            <Tabs variant="outline" defaultValue="all">
                <Tabs.List >
                    <Tabs.Tab value="all" icon={<IconPhoto size="0.8rem" />}>All Photos</Tabs.Tab>
                    <Tabs.Tab value="folders" icon={<IconFolders size="0.8rem" />}>Folders</Tabs.Tab>
                    <Tabs.Tab value="options" icon={<IconAdjustmentsAlt size="0.8rem" />}>Options</Tabs.Tab>
                </Tabs.List>
    
                <Tabs.Panel value="all" pt="xs">
                    <All />           
                </Tabs.Panel>
    
                <Tabs.Panel value="folders" pt="xs">
                    <Folders />
                </Tabs.Panel>
    
                <Tabs.Panel value="options" pt="xs">
                    <Options />
                </Tabs.Panel>
    
                
            </Tabs>
        );
    }

    
}
