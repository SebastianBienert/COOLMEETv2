import React from 'react';
import axios from "axios";
import { BASE_URL } from "../constants";
import withAuth from '../withAuth';
import { withRouter} from 'react-router-dom'
import EventListComponent from '../EventListComponent/EventListComponent';

class AllEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };
        this.fetchEventList()
    }

    fetchEventList = () => {
        axios.get(BASE_URL + "/Event")
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
export default withAuth(withRouter(AllEvents));