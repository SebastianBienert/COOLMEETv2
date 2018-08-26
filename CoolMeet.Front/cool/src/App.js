import React, { Component } from 'react';
import MainMenu from './components/MainMenu/MainMenu'
import LoginPage from './components/LoginPage/LoginPage'
import EventInfo from './components/EventInfo/EventInfo';
import axios from "axios"
import RegisterPage from './components/RegisterPage/RegisterPage'
import './App.css';
import { history } from './helpers/history';
import { alertActions } from './actions/alertActions';
import { connect } from 'react-redux';
import { Router, Route, Switch} from 'react-router-dom';
import LoggedUserEventList from './components/LoggedUserEventList/LoggedUserEventList';
import {authService} from './services/AuthService';
import EventAdminPanel from './components/EventAdminPanel/EventAdminPanel';
import EditEvent from './components/EditEvent/EditEvent';
import moment from 'moment';
import 'moment/locale/pl';
import AllEvents from './components/AllEvents/AllEvents';
import AddEventForm from './components/AddEventForm/AddEventForm';
import UserSettingsPage from './components/UserSettingsPage/UserSettingsPage';

class App extends Component {

  constructor(props){
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
        // clear alert on location change
        dispatch(alertActions.clear());
    });
    axios.interceptors.request.use(
      config => {
        config.headers.Authorization = `bearer ${authService.getToken()}`
        return config;
      },
      error => Promise.reject(error)
    );

    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      // Do something with response error
      if(error.response.status === 401){
        authService.logout();
        history.replace('/login')
      }
      return Promise.reject(error);
    });

    moment.locale('pl'); 

  }

  

  render() {
      return (
        <Router history={history}>
        <div className="container-fluid">
        <MainMenu/>
            <div className="col-12">
              <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/LoggedUserEventList" component={LoggedUserEventList} />
                <Route path="/events" component={AllEvents} /> 
                <Route path="/newEvent" component={AddEventForm}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/eventInfo/:id" component={EventInfo} />
                <Route path="/eventAdministrationPanel/:id" component={EventAdminPanel} />
                <Route path="/editEvent/:id" component={EditEvent} />
                <Route path="/userSettings" component={UserSettingsPage} />
              </Switch>
            </div>
        </div>
        </Router>
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

export default connect(mapStateToProps)(App);
