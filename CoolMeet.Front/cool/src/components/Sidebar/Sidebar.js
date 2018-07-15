import React from 'react';
import {NavLink} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import AuthService from '../AuthService';
import { BASE_URL } from '../constants';
import Greetings from './Greetings';
import {NavItem, Navbar, Nav} from 'react-bootstrap';
import './Sidebar.css';
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
        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <div className="brand">Cool Meet</div>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                            {this.AuthService.loggedIn() && 
                            <LinkContainer to="/LoggedUserEventList">
                                <NavItem eventKey={1}>
                                        <i className="fa fa-calendar fa-lg"></i> Moje wydarzenia
                                </NavItem>
                            </LinkContainer>
                            }

                            {this.AuthService.loggedIn() && 
                            <LinkContainer to="/events">
                                <NavItem eventKey={2}>
                                        <i className="fa fa-dashboard fa-lg"></i> Wszystkie wydarzenia
                                </NavItem>
                            </LinkContainer>
                            }

                            {this.AuthService.loggedIn() && 
                            <LinkContainer to="/newEvent">
                                <NavItem eventKey={3}>
                                        <i className="fa fa-calendar-plus-o fa-lg"></i> Dodaj wydarzenie
                                </NavItem>
                            </LinkContainer>
                            }

                            {!this.AuthService.loggedIn() && 
                            <LinkContainer to="/login">
                                <NavItem eventKey={4}> 
                                        <i className="fa fa-user fa-lg"></i> Zaloguj się
                                </NavItem>
                            </LinkContainer>    
                            }

                            {!this.AuthService.loggedIn() && 
                            <LinkContainer to="/register">
                                <NavItem eventKey={5}>
                                        <i className="fa fa-user-plus fa-lg"></i> Rejestracja
                                </NavItem>
                            </LinkContainer>
                            }
                            
                            {this.AuthService.loggedIn() &&
                            <LinkContainer to="/login">
                                <NavItem eventKey={6} onClick={this.logout}>
                                            <i className="fa fa-user fa-lg"></i> Wyloguj się
                                </NavItem>     
                            </LinkContainer>                   
                            }
                            {this.AuthService.loggedIn() && 
                            <NavItem eventKey={0}>
                                <Greetings history={this.props.history} key={this.state.loggedIn} />
                            </NavItem>
                            }
                </Nav>
        </Navbar>
        );
    }
  }