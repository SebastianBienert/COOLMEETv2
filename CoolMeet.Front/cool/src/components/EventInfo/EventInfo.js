import React from 'react';
import Event from "../Event/Event";
import axios from "axios";
import { BASE_URL, DEFAULT_EVENT } from "../constants";
import withAuth from '../withAuth';
import AuthService from '../AuthService';
import '../EventInfo/EventInfo.css';
import './EventInfo.css'
import { withRouter } from 'react-router-dom';
import {Grid, Panel, Col, Row, Button} from 'react-bootstrap';

class EventInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: DEFAULT_EVENT,
            address: "Somewhere",
            textComment: "",
            userAlreadyJoined: true
        };
        this.AuthService = new AuthService(BASE_URL);
    }

    componentDidMount() {
        axios.get(BASE_URL + `/Event/eventInfo/${this.props.match.params.id}`, this.AuthService.getConfigForAuthorize())
            .then(response => {
                this.setState({
                    event: response.data,
                    userAlreadyJoined: this.userAlreadyJoinedEvent(),
                });

                this.setState({
                    address: `${this.state.event.country} ${this.state.event.city} ${this.state.event.address}`
                });
            })
            .catch(error => console.log(error));
    }

    userAlreadyJoinedEvent = () => {
        const allIds = this.state.event.users.map(user => user.id);
        return allIds.includes(this.AuthService.getUserInformation().id)
    }


    render() {
        return (
            <Grid>
                <Col xs={12}>
                    <br/>
                    <Panel>
                        <Panel.Heading className="bg-ownStyl text-center">
                            <Row>
                                <span className="text-center eventName">{this.state.event.name}</span>
                                <Button type="button" disabled={this.state.userAlreadyJoined || this.state.statusUnavailable}
                                        bsStyle="success" className="pull-right joinButton" onClick={this.joinEvent}>Dołącz</Button>
                            </Row>
                        </Panel.Heading >
                        <Panel.Body>
                            <Event event={this.state.event} key={this.state.event.id} />
                        </Panel.Body>
                    </Panel>
                </Col>
            </Grid>
        );
    }
}
export default withAuth(withRouter(EventInfo));
