import React, { Component } from 'react';
import AuthService from './AuthService';
import {BASE_URL} from 'constants';
export default function withAuth(AuthComponent) {
    const service = new AuthService(BASE_URL);
    return class AuthWrapped extends Component{
        constructor()
        {
            super();
            this.state ={
                user: null
            }
        }
        componentWillMount() {
            if (!service.loggedIn()) {
               this.props.history.replace('/login')
            }
            else {
                try {
                    const profile = service.getProfile()
                    this.setState({
                        user: profile
                    })
                }
                catch(err){
                    service.logout();
                    this.props.history.replace('/login');
                }
            }
        }
        render(){
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} />
                )
            }
            else {
                return null
            }
        }
    }
}
