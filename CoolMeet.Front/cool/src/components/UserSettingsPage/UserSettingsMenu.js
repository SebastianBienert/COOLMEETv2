import React from 'react';
import { Menu } from 'antd';
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
            'textTransform' : 'capitalize',
            'paddingTop': '18px',
            'fontSize' : '18px',
            'paddingBottom': '18px', 
            'paddingLeft': '24px',
            'paddingRight': '24px',
        }
        return (
            <div>
                <Image responsive src={this.state.photo}></Image>   
                <div style={styling} className="text-center">{firstName} {lastName}</div>
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
            </div>
        )
    }
    
}
export default UserSettingsMenu;