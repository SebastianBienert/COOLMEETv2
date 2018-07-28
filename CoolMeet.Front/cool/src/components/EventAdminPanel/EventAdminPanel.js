import React from 'react';
import axios from "axios";
import {BASE_URL, DEFAULT_EVENT} from "../constants";
import withAuth from '../withAuth';
import '../EventAdminPanel/EventAdminPanel.css';
import { withRouter, Link } from 'react-router-dom'
import {Grid, Panel, Col, Button} from 'react-bootstrap';
class EventAdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: DEFAULT_EVENT
        };
    }

    componentWillMount() {
        axios.get(BASE_URL + `/Event/eventInfo/${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                event: response.data
            });
        })
        .catch(error => console.log(error));
            
    }

    deleteEvent = () => {
        axios.delete(BASE_URL + `/Event/${this.props.match.params.id}`)
        .then(response => {
            this.props.history.replace(`/LoggedUserEventList`);
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <Grid>
                <Col xs={12}>
                    <br/>
                    <Panel bsStyle="primary">
                        <Panel.Heading componentClass="h3" className="text-center">
                            Panel administratora
                        </Panel.Heading>
                        <Panel.Body>
                            <Link to={`/editEvent/${this.state.event.id}`} >
                                <Button type="button" bsStyle="info">Aktualizuj Dane</Button>
                            </Link>
                            <Button type="button" bsStyle="danger" onClick = {this.deleteEvent}>Usuń Event</Button>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Grid>
        );
    }

}
export default withAuth(withRouter(EventAdminPanel));
