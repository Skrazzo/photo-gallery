import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs } from '@mantine/core';
import All from './All';
import { IconPhoto, IconFolders, IconAdjustmentsAlt} from '@tabler/icons-react';
import Folders from './Folders';
import Options from './Options';

export default function App() {
    
    
    return (
        <Tabs variant="outline" defaultValue="gallery">
            <Tabs.List>
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
    )
}
