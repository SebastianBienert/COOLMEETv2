import React from 'react';
import axios from "axios";
import {BASE_URL, DEFAULT_EVENT} from "../constants";
import withAuth from '../withAuth';
import AuthService from '../AuthService';
import '../EventAdminPanel/EventAdminPanel.css';
import { withRouter, Link } from 'react-router-dom'

class EventAdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: DEFAULT_EVENT
        };
        this.AuthService = new AuthService(BASE_URL);
    }

    componentWillMount() {
        axios.get(BASE_URL + `/Event/eventInfo/${this.props.match.params.id}`, this.AuthService.getConfigForAuthorize())
        .then(response => {
            this.setState({
                event: response.data
            });
        })
        .catch(error => console.log(error));
            
    }

    deleteEvent = () => {
        axios.delete(BASE_URL + `/Event/${this.props.match.params.id}`, this.AuthService.getConfigForAuthorize())
        .then(response => {
            this.props.history.replace(`/LoggedUserEventList`);
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="col-12">
                <br/>
                <div className="card">
                    <div className="card-title bg-primary text-center">
                        <h3>Panel administratora</h3>
                    </div>
                    <div>
                        <Link to={`/editEvent/${this.state.event.id}`} >
                            <button type="button" className="btn btn-dark">Aktualizuj Dane </button>
                        </Link>
                        <button type="button" className="btn btn-danger" onClick = {this.deleteEvent} >Usuń Event </button>
                    </div>
                </div>
            </div>
        );
    }

}
export default withAuth(withRouter(EventAdminPanel));
