import React from 'react';
import axios from "axios";
import {BASE_URL, DEFAULT_EVENT} from "../constants";
import withAuth from '../withAuth';
import EditEventSubPage from './EditEventSubPage';
import EventAdminPanelMenu from './EventAdminPanelMenu';
import DeleteEventSubPage from './DeleteEvenSubPage';
import ManageUsersSubPage from './ManageUsersSubPage';
import ManageTagsSubPage from './ManageTagsSubPage';
import '../EventAdminPanel/EventAdminPanel.css';
import { withRouter } from 'react-router-dom'
import { Layout, Tag} from 'antd';
import toastr from 'toastr';

const {  Content, Sider } = Layout;

export const subPages = {
    EDIT_EVENT : 'EDIT_EVENT',
    DELETE_EVENT : 'DELETE_EVENT',
    MANAGE_USERS : 'MANAGE_USERS',
    MANAGE_TAGS : 'MANAGE_TAGS'
}
class EventAdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: DEFAULT_EVENT,
            subPage : subPages.EDIT_EVENT,
            tagInputValue : "",
            inputTagVisible : false
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
            case subPages.MANAGE_TAGS:{
                return <ManageTagsSubPage
                         customRenderer={this.customRenderer} 
                         tags={this.state.event.tags}
                         handleInputChange={this.handleTagInputChange}
                         handleInputConfirm={this.handleTagInputConfirm}
                         inputValue={this.state.tagInputValue}
                         inputVisible={this.state.inputTagVisible}
                         showInput = {this.showTagInput}
                         confirmTagChanges = {this.sendUpdateTags}
                          />
            }
            default:{
                return 'XD';
            }
        }
    }

    sendUpdateTags = (e) => {
        e.preventDefault();
        axios.patch(`${BASE_URL}/Event/${this.props.match.params.id}/tags`, this.state.event.tags)
        .then(resp =>{
            this.setState(prevState =>( {
                event : {
                    ...prevState.event,
                    tags : resp.data
                }
            }))
            toastr.success("Zaktualizowano tagi");
        })
        .catch(error =>{
            toastr.error("Cos poszlo nie tak");
        })
    }

    showTagInput = () => {
        this.setState({ inputTagVisible: true });
    }
    changeCurrentSubPage = (event) => {
        this.setState({
            subPage : event.item.props.value
        });
    }

    handleTagInputChange = (e) => {
        this.setState({ tagInputValue: e.target.value });
    }

    handleTagInputConfirm = () => {
        const inputValue = {
            id : Math.ceil(Math.random() * 1000 + 100),
            name : this.state.tagInputValue
        }
        let tags = this.state.event.tags;
        if (this.state.tagInputValue && tags.indexOf(this.state.tagInputValue) === -1) {
            this.setState(prevState => ({
                event: {
                    ...prevState.event,
                    tags : [...tags, inputValue]
                }
            }))
        }
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
    };

    deleteTag = (tag) =>{
        this.setState(prevState => ({
            event: {
                ...prevState.event,
                tags : prevState.event.tags.filter(t => t.id !== tag.key)
            }
        }))
    };

    customRenderer = (tag, size, color) => {
        return <Tag key={tag.value} afterClose={() => this.deleteTag(tag)} closable>{tag.value}</Tag>
    };

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
