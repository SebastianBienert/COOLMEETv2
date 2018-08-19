import React from 'react';
import { Menu, Icon } from 'antd';
import { subPages } from './UserSettingsPage';

class UserSettingsMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
            >
                <Menu.Item key="1" value={subPages.CHANGE_DATA} onClick={this.props.changePage}>Zmien dane profilowe</Menu.Item>
                <Menu.Item key="2" value={subPages.CHANGE_PHOTO} onClick={this.props.changePage}>Zmien zdjęcie profilowe</Menu.Item>
                <Menu.Item key="3" value={subPages.CHANGE_PASSWORD} onClick={this.props.changePage}>Zmien haslo</Menu.Item>
                <Menu.Item key="4" value={subPages.CHANGE_SETTINGS} onClick={this.props.changePage}>Ustawienia konta</Menu.Item>
            </Menu>
        )
    }
    
}
export default UserSettingsMenu;