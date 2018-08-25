import React from 'react';
import EventDescription from "./EventDescription";
import axios from "axios";
import { BASE_URL, DEFAULT_EVENT, EVENT_STATUS } from "../constants";
import withAuth from '../withAuth';
import '../EventInfo/EventInfo.css';
import './EventInfo.css'
import { withRouter } from 'react-router-dom';
import {Grid, Panel, Col, Row, Button} from 'react-bootstrap';
import Map from '../Map/Map';
import CommentsList from '../CommentsList/CommentsList'
import UserList from './UserList';

class EventInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: DEFAULT_EVENT,
            address: "Somewhere",
            textComment: "",
            userAlreadyJoined: false,
            statusUnavailable : true,
            dataLoading : true
        };
    }

    componentDidMount() {
        axios.get(BASE_URL + `/Event/${this.props.match.params.id}`)
            .then(response => {
                const event = response.data;
                this.setState({
                    event: event,
                    userAlreadyJoined: this.userAlreadyJoinedEvent(),
                    address: `${event.country} ${event.city} ${event.address}`,
                    statusUnavailable : event.status.description == EVENT_STATUS.Unavailable,
                    dataLoading : false
                });
            })
            .catch(error => console.log(error));
    }

    userAlreadyJoinedEvent = () => {
        const allIds = this.state.event.users.map(user => user.id);
        return allIds.includes(this.props.user.id)
    }



    render() {
        const event = this.state.event;
        const address = `${event.country} ${event.city} ${event.address}`;
        return (
            <Grid fluid>
                <Row xs={12}>
                    <Panel>
                        <Panel.Heading className="text-center">
                            <Row>
                                <span className="text-center eventName">{event.name}</span>
                                <Button type="button" disabled={this.state.userAlreadyJoined || this.state.statusUnavailable}
                                        bsStyle="success" className="pull-right joinButton" onClick={this.joinEvent}>Dołącz</Button>
                            </Row>
                        </Panel.Heading>
                        <Panel.Body>
                            <Row>
                                <Col xs={3}><EventDescription event={this.state.event} key={event.id} /></Col>
                                <Col xs={7}>
                                    <Map address={address} name={event.name} />
                                </Col>
                                <Col xs={2}><UserList users={event.users}></UserList></Col>
                            </Row>
                        </Panel.Body>
                    </Panel>
                </Row>
                <Row>
                    <CommentsList eventId={event.id} comments={event.comments} />
                </Row>
            </Grid>
        );
    }
}
export default withAuth(withRouter(EventInfo));
