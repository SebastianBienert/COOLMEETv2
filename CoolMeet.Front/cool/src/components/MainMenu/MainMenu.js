import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';
import {userActions} from '../../actions/userActions';
import Greetings from './Greetings';
import {NavItem, Navbar, Nav} from 'react-bootstrap';
import './MainMenu.css';

class MainMenu extends React.Component {

    logout = (event) =>
    {
        const {dispatch} = this.props
        dispatch(userActions.logout())
    }

    render() {
        const {loggedIn} = this.props;
      return (
        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <div className="brand">Cool Meet</div>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                            {loggedIn && 
                            <LinkContainer to="/LoggedUserEventList">
                                <NavItem eventKey={1}>
                                        <i className="fa fa-calendar fa-lg"></i> Moje wydarzenia
                                </NavItem>
                            </LinkContainer>
                            }

                            {loggedIn && 
                            <LinkContainer to="/events">
                                <NavItem eventKey={2}>
                                        <i className="fa fa-dashboard fa-lg"></i> Wszystkie wydarzenia
                                </NavItem>
                            </LinkContainer>
                            }

                            {loggedIn && 
                            <LinkContainer to="/newEvent">
                                <NavItem eventKey={3}>
                                        <i className="fa fa-calendar-plus-o fa-lg"></i> Dodaj wydarzenie
                                </NavItem>
                            </LinkContainer>
                            }
                            {loggedIn && 
                            <LinkContainer to="/userSettings">
                                <NavItem eventKey={7}>
                                        <i className="fa fa-cog fa-lg"></i> Ustawienia
                                </NavItem>
                            </LinkContainer>
                            }

                            {!loggedIn &&  
                            <LinkContainer to="/login">
                                <NavItem eventKey={4}> 
                                        <i className="fa fa-user fa-lg"></i> Zaloguj się
                                </NavItem>
                            </LinkContainer>    
                            }

                            {!loggedIn && 
                            <LinkContainer to="/register">
                                <NavItem eventKey={5}>
                                        <i className="fa fa-user-plus fa-lg"></i> Rejestracja
                                </NavItem>
                            </LinkContainer>
                            }
                            
                            {loggedIn && 
                            <LinkContainer to="/login">
                                <NavItem eventKey={6} onClick={this.logout}>
                                            <i className="fa fa-user fa-lg"></i> Wyloguj się
                                </NavItem>     
                            </LinkContainer>                   
                            }
                            {loggedIn && 
                            <NavItem eventKey={0}>
                                <Greetings/>
                            </NavItem>
                            }
                </Nav>
        </Navbar>
        );
    }
  }

  function mapStateToProps(state) {
    const { loggedIn, user } = state.authentication;
    return {
        loggedIn,
        user
    };
  }

  export default connect(mapStateToProps)(MainMenu)