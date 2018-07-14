import React from 'react';
import withAuth from '../withAuth'
import AuthService from '../AuthService';
class Greetings extends React.Component{
    constructor(){
        super();
        this.AuthService = new AuthService();
        this.state = {
            userInformation: this.AuthService.getUserInformation()
        }
    }

    render(){
        return(
            <h4 class="text-center capitalize-text"> Witaj {this.state.userInformation.firstName} {this.state.userInformation.lastName}!</h4>
        );
    }
}

export default withAuth(Greetings);