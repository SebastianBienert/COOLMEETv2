import React from 'react';
import EventCard from "../EventCard/EventCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import withAuth from '../withAuth';
import AuthService from '../AuthService';
import ceil from 'ceil';
import EventListComponent from '../EventListComponent/EventListComponent';
import { withRouter} from 'react-router-dom'
import moment from 'moment';

class LoggedUserEventList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
        };
        this.AuthService = new AuthService(BASE_URL);
        this.fetchLoggedUserEventList()
    }

    fetchLoggedUserEventList = () => {
        axios.get(BASE_URL + `/Event/GetLoggedUserEvents`, this.AuthService.getConfigForAuthorize())
            .then(response => {
                this.setState({
                    events: response.data,
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return(
            <EventListComponent events={this.state.events}
                                dateStartInitialFilter = {null}
                                dateEndInitialFilter = {null}
                                filter = {false}
                                pageSize = {2}
                                />
        )
    }
}
export default withAuth(withRouter(LoggedUserEventList));