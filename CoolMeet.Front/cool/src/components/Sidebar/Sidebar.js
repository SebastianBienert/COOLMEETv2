import React from 'react';
import './Sidebar.css';
import {NavLink} from 'react-router-dom';
import AuthService from '../AuthService';
import { BASE_URL } from '../constants';
import Greetings from './Greetings';

export default class Sidebar extends React.Component {

    constructor(){
        super();
        this.AuthService = new AuthService(BASE_URL);
        this.logout = this.logout.bind(this);
        this.state = {
            loggedIn: this.AuthService.loggedIn()
        }
    }

    logout(event)
    {
        this.AuthService.logout();
        this.setState({loggedIn: false});
    }

    render() {
      return (
        <div className="nav-side-menu">
            <div className="brand">Cool Meet</div>
            {this.AuthService.loggedIn() && 
                <Greetings history={this.props.history} key={this.state.loggedIn} />
            }
            <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
        
                <div className="menu-list">
        
                    <ul id="menu-content" className="menu-content collapse out">

                        {this.AuthService.loggedIn() && 
                        <NavLink to="/LoggedUserEventList" className="nostyle">  
                        <li>
                            <i className="fa fa-calendar fa-lg"></i> Moje wydarzenia
                        </li>
                        </NavLink>
                        }

                        {this.AuthService.loggedIn() && 
                        <NavLink to="/events" className="nostyle">  
                        <li>
                            <i className="fa fa-dashboard fa-lg"></i> Wszystkie wydarzenia
                        </li>
                        </NavLink>
                        }

                        {this.AuthService.loggedIn() && 
                        <NavLink to="/newEvent" className="nostyle">   
                        <li>
                            <i className="fa fa-calendar-plus-o fa-lg"></i> Dodaj wydarzenie
                        </li>
                        </NavLink>
                        }

                        {!this.AuthService.loggedIn() && 
                        <NavLink to="/login" className="nostyle">   
                        <li>
                            <i className="fa fa-user fa-lg"></i> Zaloguj się
                        </li>
                        </NavLink>
                        }

                        {!this.AuthService.loggedIn() && 
                        <NavLink to="/register" className="nostyle">   
                        <li>
                            <i className="fa fa-user-plus fa-lg"></i> Rejestracja
                        </li>
                        </NavLink>
                        }
                        
                        {this.AuthService.loggedIn() &&
                        <NavLink to="/login" className="nostyle">  
                            <li onClick={this.logout}>
                                <i className="fa fa-user fa-lg"></i> Wyloguj się
                            </li>
                        </NavLink>                            
                        }
                    </ul>
            </div>
        </div>
        );
    }
  }