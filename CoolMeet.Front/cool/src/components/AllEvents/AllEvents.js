import React from 'react';
import EventCard from "../EventCard/EventCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import withAuth from '../withAuth';
import AuthService from '../AuthService';
import ceil from 'ceil';
import {Panel, Col, Row, Button, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import EventListComponent from '../EventListComponent/EventListComponent';
import moment from 'moment';
class AllEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };
        this.AuthService = new AuthService(BASE_URL);
        this.fetchEventList()
    }

    fetchEventList = () => {
        axios.get(BASE_URL + "/Event", this.AuthService.getConfigForAuthorize())
            .then(response => {
                this.setState({
                    events: response.data,
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return( <EventListComponent events={this.state.events}
                                    dateStartInitialFilter = {null}
                                    dateEndInitialFilter = {null}
                                    filter = {false}
                                    pageSize = {3}
                                />
       )
    }
    
}
export default withAuth(AllEvents);