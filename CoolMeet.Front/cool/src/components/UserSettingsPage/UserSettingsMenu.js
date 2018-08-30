import React from 'react';
import { Menu, Icon } from 'antd';
import { subPages } from './UserSettingsPage';
import {Image} from 'react-bootstrap';
import AvatarPlaceholder from '../../assets/avatar.png'

class UserSettingsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            photo : this.props.photoUrl || AvatarPlaceholder
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.photo !== nextProps.photoUrl){
            this.setState({
                photo : nextProps.photoUrl || AvatarPlaceholder
            })
        }
    }

    render() {
        const {firstName, lastName} = this.props;
        const styling = {
            'text-transform' : 'capitalize',
            'padding-top': '18px',
            'font-size' : '18px',
            'padding-bottom': '18px', 
            'padding-left': '24px',
            'padding-right': '24px',
        }
        return (
            <div>   
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                >
                    <Image responsive src={this.state.photo}></Image>
                    <div style={styling} class="text-center">{firstName} {lastName}</div>
                    <Menu.Item key="1" value={subPages.CHANGE_DATA} onClick={this.props.changePage}>Zmien dane profilowe</Menu.Item>
                    <Menu.Item key="2" value={subPages.CHANGE_PHOTO} onClick={this.props.changePage}>Zmien zdjęcie profilowe</Menu.Item>
                    <Menu.Item key="3" value={subPages.CHANGE_PASSWORD} onClick={this.props.changePage}>Zmien haslo</Menu.Item>
                    <Menu.Item key="4" value={subPages.CHANGE_SETTINGS} onClick={this.props.changePage}>Ustawienia konta</Menu.Item>
                </Menu>
            </div>
        )
    }
    
}
export default UserSettingsMenu;