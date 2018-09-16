import React from 'react';
import UserSettingsMenu from './UserSettingsMenu'
import {connect} from 'react-redux';
import withAuth from '../withAuth';
import { withRouter} from 'react-router-dom'
import { Layout } from 'antd';
import ChangePasswordSubPage from './ChangePasswordSubPage';
import ChangeUserDataSubPage from './ChangeUserDataSubPage';
import ChangeUserPhotoSubPage from './ChangeUserPhotoSubPage';
import ChangeProfileSettings from './ChangeProfileSettings';
const { Content, Sider } = Layout;

export const subPages = {
    CHANGE_DATA : 'CHANGE_DATA',
    CHANGE_PASSWORD : 'CHANGE_PASSWORD',
    CHANGE_PHOTO : 'CHANGE_PHOTO',
    CHANGE_SETTINGS : 'CHANGE_SETTINGS'
}

class UserSettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subPage : subPages.CHANGE_DATA
        }
    }

    getCurrentSubPage = () => {
        switch(this.state.subPage){
            case subPages.CHANGE_PASSWORD:{
                return <ChangePasswordSubPage/>
            }
            case subPages.CHANGE_DATA:{
                return <ChangeUserDataSubPage {...this.props.user}/>
            }
            case subPages.CHANGE_PHOTO:{
                return <ChangeUserPhotoSubPage />
            }
            case subPages.CHANGE_SETTINGS:{
                return <ChangeProfileSettings 
                                allowShowingProfile={this.props.user.allowShowingProfile}
                                allowBrowsingEvents={this.props.user.allowBrowsingEvents} />
            }
            default:{
                return 'XD';
            }
        }
    }

    changeCurrentSubPage = (event) => {
        this.setState({
            subPage : event.item.props.value
        });
    }

    render() {
        return (
            <Layout>
                <Sider
                    style={{ background: '#fff' }}
                    trigger={null}>
                        <div className="logo" />
                        <UserSettingsMenu changePage={this.changeCurrentSubPage} {...this.props.user}/>
                </Sider>
                <Layout>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        {this.getCurrentSubPage()}
                    </Content>
                </Layout>
          </Layout>
        )
    }
    
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user
    };
  }

export default connect(mapStateToProps)(withAuth(withRouter(UserSettingsPage)));