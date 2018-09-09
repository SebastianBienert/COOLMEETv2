import React from 'react';
import {subPages} from './EventAdminPanel';
import { Menu } from 'antd';

const EventAdminPanelMenu = ({changePage, name}) => {
    const styling = {
        'textTransform' : 'capitalize',
        'paddingTop': '18px',
        'fontSize' : '18px',
        'paddingBottom': '18px', 
        'paddingLeft': '24px',
        'paddingRight': '24px',
        'lineHeight': 'normal'
    }
    return (
        <div>   
            <div style={styling} className="text-center">{name}</div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
            >
                <Menu.Item key="1" value={subPages.EDIT_EVENT} onClick={changePage}>Edytuj wydarzenie</Menu.Item>
                <Menu.Item key="2" value={subPages.MANAGE_USERS} onClick={changePage}>Zarządzaj uczestnikami</Menu.Item>
                <Menu.Item key="3" value={subPages.MANAGE_TAGS} onClick={changePage}>Zarządzaj tagami</Menu.Item>
                <Menu.Item key="4" value={subPages.DELETE_EVENT} onClick={changePage}>Usuń wydarzenie</Menu.Item>
            </Menu>
        </div>
    )
};

export default EventAdminPanelMenu;