import React from 'react';
import EventCard from "../EventCard/EventCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import withAuth from '../withAuth';
import AuthService from '../AuthService';
import ceil from 'ceil';
import {Panel, Col, Row, Button, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import EventListComponent from '../EventListComponent/EventListComponent';

class AllEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            eventsToShow: [],
            pages: [],
            currentPage: 1,
            dateAfter: "",
            dateBefore: "",
            filter: "",
            status: 0
        };
        this.AuthService = new AuthService(BASE_URL);
        this.fetchEventList()
    }

    fetchEventList = () => {
        axios.get(BASE_URL + "/Event")
        .then(response => {
            this.setState({
                events: response.data
            });
        })
        .catch(error => console.log(error));
        const d = new Date();
        d.setDate(d.getDate());
        const today = d.toISOString();
        const tommorow = new Date(d);
        tommorow.setDate(tommorow.getDate() + 1);
        const tommorowStringDate = tommorow.toISOString();
        axios.get(BASE_URL + "/Event", this.AuthService.getConfigForAuthorize())
            .then(response => {
                this.setState({
                    events: response.data,
                    dateBefore: tommorowStringDate.substring(0, 16),
                    dateAfter: today.substring(0, 16),
                    filter: false
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return( <EventListComponent events={this.state.events}
                                    dateBefore = {this.state.dateBefore}
                                    dateAfter = {this.state.dateAfter}
                                    filter = {this.state.filter}
                                />
       )
    }
    
}
export default withAuth(AllEvents);