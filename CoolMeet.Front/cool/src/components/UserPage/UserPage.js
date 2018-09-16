import React, { Component } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import {Grid, Row, Col, Well} from 'react-bootstrap';
import { BASE_URL} from "../constants";
import EventListComponent from '../EventListComponent/EventListComponent';

class UserPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            events : [],
            firstName : "",
            lastName : "",
            photoUrl : "",
            email : "",
            allowShowingProfile : false,
            allowBrowsingEvents : false
        }
    }

    componentDidMount(){
        this.fetchUserInfo(this.props.match.params.id);
        this.fetchUserEvents(this.props.match.params.id);
    }

    fetchUserInfo = (id) => {
        axios.get(BASE_URL + `/user/${id}`)
        .then(response => {
            this.setState({
                firstName : response.data.firstName,
                lastName : response.data.lastName,
                photoUrl : response.data.photoUrl,
                email : response.data.email,
                allowBrowsingEvents : response.data.allowBrowsingEvents,
                allowShowingProfile : response.data.allowShowingProfile
            });
        })
        .catch(error => console.log(error));
    }

    fetchUserEvents = (id) => {
        axios.get(BASE_URL + `/user/${id}/events`)
        .then(response => {
            this.setState({
                events : response.data
            });
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={2}>
                        <UserCard {...this.state}/>
                    </Col>
                    <Col xs ={10}>
                        {this.state.allowBrowsingEvents ?
                            <EventListComponent events={this.state.events}
                                        dateStartInitialFilter = {null}
                                        dateEndInitialFilter = {null}
                                        filter = {false}
                                        pageSize = {2}
                                        />
                            :
                            <Well>
                                Uzytkownik nie zezwolil na przegladnie historii wydarzen
                            </Well>
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default UserPage;