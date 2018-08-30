import React from 'react';
import {subPages} from './EventAdminPanel';
import { Menu, Icon } from 'antd';

const EventAdminPanelMenu = ({changePage, name}) => {
    const styling = {
        'text-transform' : 'capitalize',
        'padding-top': '18px',
        'font-size' : '18px',
        'padding-bottom': '18px', 
        'padding-left': '24px',
        'padding-right': '24px',
        'line-height': 'normal'
    }
    return (
        <div>   
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
            >
                <div style={styling} class="text-center">{name}</div>
                <Menu.Item key="1" value={subPages.EDIT_EVENT} onClick={changePage}>Edytuj wydarzenie</Menu.Item>
                <Menu.Item key="2" value={subPages.MANAGE_USERS} onClick={changePage}>Zarządzaj uczestnikami</Menu.Item>
                <Menu.Item key="3" value={subPages.DELETE_EVENT} onClick={changePage}>Usuń wydarzenie</Menu.Item>
            </Menu>
        </div>
    )
};

export default EventAdminPanelMenu;