import React, { Component } from 'react';
import EventListComponent from '../EventListComponent/EventListComponent';
import axios from 'axios';
import { BASE_URL } from "../constants";
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';

class TagPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
        };
        this.fetchEventsByTag(this.props.match.params.tagName)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.tagName !== this.props.match.params.tagName) {
            this.fetchEventsByTag(nextProps.match.params.tagName)
        }
    }

    fetchEventsByTag = (tagName) => {
        axios.get(BASE_URL + `/Event?tag=${tagName}`)
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
export default withAuth(withRouter(TagPage));