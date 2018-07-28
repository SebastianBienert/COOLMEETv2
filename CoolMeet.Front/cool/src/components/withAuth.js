import React, { Component } from 'react';
import {authService} from '../services/AuthService';
import {connect} from 'react-redux';

export default function withAuth(AuthComponent) {

    class AuthWrapped extends Component{
        componentWillMount() {
            if (!this.props.loggedIn) {
               this.props.history.replace('/login');
               authService.logout();
            }
        }
        render(){
            if (this.props.loggedIn) {
                return (
                    <AuthComponent {...this.props} />
                )
            }
            else {
                return (<h1>AUNAUTHORIZED</h1>)
            }
        }
    }

    function mapStateToProps(state) {
        const {loggedIn, user} = state.authentication;
        return{
            user,
            loggedIn
        }
    }

    return connect(mapStateToProps)(AuthWrapped)
}
