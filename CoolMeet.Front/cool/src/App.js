import React, { Component } from 'react';
import Sidebar from './components/Sidebar/Sidebar'
import LoginPage from './components/LoginPage/LoginPage'
import EventInfo from './components/EventInfo/EventInfo';
import axios from "axios"
import RegisterPage from './components/RegisterPage/RegisterPage'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoggedUserEventList from './components/LoggedUserEventList/LoggedUserEventList';
import AuthService from './components/AuthService';
import EventAdminPanel from './components/EventAdminPanel/EventAdminPanel';
import EditEvent from './components/EditEvent/EditEvent';
import moment from 'moment';
import 'moment/locale/pl';
import AllEvents from './components/AllEvents/AllEvents';
import AddEventForm from './components/AddEventForm/AddEventForm';

class App extends Component {

  constructor(){
    super();
    const authService = new AuthService();
    axios.interceptors.request.use(
      config => {
        config.headers.Authorization = `bearer ${authService.getToken()}`
        return config;
      },
      error => Promise.reject(error)
    );

    axios.interceptors.response.use(function (response) {
      console.log(response);
      return response;
    }, function (error) {
      // Do something with response error
      console.log("error", error);
      if(error.response.status === 401){
        authService.logout();
        this.props.history.replace('/login')
      }
      return Promise.reject(error);
    });

    moment.locale('pl'); 

  }

  render() {
      return (
        <Router>
        <div className="container-fluid">
        <Sidebar history="/"/>
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
              </Switch>
            </div>
        </div>
        </Router>
      );
     }
}

export default App;