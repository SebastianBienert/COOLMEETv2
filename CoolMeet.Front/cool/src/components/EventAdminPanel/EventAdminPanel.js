import React from 'react';
import axios from "axios";
import {BASE_URL, DEFAULT_EVENT} from "../constants";
import withAuth from '../withAuth';
import EditEventSubPage from './EditEventSubPage';
import EventAdminPanelMenu from './EventAdminPanelMenu';
import DeleteEventSubPage from './DeleteEvenSubPage';
import ManageUsersSubPage from './ManageUsersSubPage';
import '../EventAdminPanel/EventAdminPanel.css';
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd';
import toastr from 'toastr';

const {  Content, Footer, Sider } = Layout;

export const subPages = {
    EDIT_EVENT : 'EDIT_EVENT',
    DELETE_EVENT : 'DELETE_EVENT',
    MANAGE_USERS : 'MANAGE_USERS'
}
class EventAdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: DEFAULT_EVENT,
            subPage : subPages.EDIT_EVENT
        };
    }

    componentWillMount() {
        axios.get(`${BASE_URL}/Event/${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                event: response.data
            });
        })
        .catch(error => console.log(error));
    }

    deleteUser = (event) => {
        event.preventDefault();
        axios.delete(`${BASE_URL}/Event/${this.props.match.params.id}/user/${event.target.value}`)
        .then(resp =>{
            this.setState({
                event: resp.data
            })
            toastr.success("Usunieto uzytkownika z wydarzenia");
        })
        .catch(error =>{
            toastr.error("Cos poszlo nie tak");
        })
    }

    assignAdminRights = (event) => {
        event.preventDefault();
        axios.patch(`${BASE_URL}/Event/${this.props.match.params.id}/user/${event.target.value}`)
        .then(resp =>{
            this.setState({
                event: resp.data
            })
            toastr.success("Nadano prawa administratora");
        })
        .catch(error =>{
            toastr.error("Cos poszlo nie tak");
        })
    }

    getCurrentSubPage = () => {
        switch(this.state.subPage){
            case subPages.EDIT_EVENT:{
                return <EditEventSubPage {...this.state.event}/>
            }
            case subPages.DELETE_EVENT:{
                return <DeleteEventSubPage deleteEvent={this.deleteEvent} />
            }
            case subPages.MANAGE_USERS:{
                return <ManageUsersSubPage 
                                        administrators={this.state.event.administrators} 
                                        users={this.state.event.users} 
                                        deleteUser={this.deleteUser}
                                        assignRights={this.assignAdminRights}/>
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

    deleteEvent = (event) => {
        event.preventDefault();
        axios.delete(`${BASE_URL}/Event/${this.props.match.params.id}`)
        .then(response => {
            this.props.history.replace(`/LoggedUserEventList`);
            toastr.success(`Usunięto ${this.state.event.name}`)
        })
        .catch(error =>{
            toastr.error("Operacja nie powiodła się");
        });
    }

    render() {
        return (
            <Layout>
                <Sider
                    style={{ background: '#fff' }}
                    trigger={null}>
                        <div className="logo" />
                        <EventAdminPanelMenu name={this.state.event.name} changePage={this.changeCurrentSubPage} {...this.props.user}/>
                </Sider>
                <Layout>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        {this.getCurrentSubPage()}
                    </Content>
                </Layout>
          </Layout>
        );
    }

}
export default withAuth(withRouter(EventAdminPanel));
