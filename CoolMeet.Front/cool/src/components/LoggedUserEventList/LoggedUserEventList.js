import React from 'react';
import axios from "axios";
import { BASE_URL } from "../constants";
import withAuth from '../withAuth';
import EventListComponent from '../EventListComponent/EventListComponent';
import { withRouter} from 'react-router-dom'

class LoggedUserEventList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
        };
        this.fetchLoggedUserEventList()
    }

    fetchLoggedUserEventList = () => {
        axios.get(BASE_URL + `/Event/GetLoggedUserEvents`)
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