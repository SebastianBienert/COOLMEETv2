import React from 'react';
import Event from "../Event/Event";
import axios from "axios";
import { BASE_URL, DEFAULT_EVENT } from "../constants";
import withAuth from '../withAuth';
import AuthService from '../AuthService';
import '../EventInfo/EventInfo.css';
import './EventInfo.css'
import { withRouter } from 'react-router-dom';

class EventInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: DEFAULT_EVENT,
            address: "Somewhere",
            textComment: "",
        };
        this.AuthService = new AuthService(BASE_URL);
    }

    componentDidMount() {
        axios.get(BASE_URL + `/Event/eventInfo/${this.props.match.params.id}`, this.AuthService.getConfigForAuthorize())
            .then(response => {
                this.setState({
                    event: response.data,
                });

                this.setState({
                    address: `${this.state.event.country} ${this.state.event.city} ${this.state.event.address}`
                });
            })
            .catch(error => console.log(error));
    }


    render() {
        return (
            <div className="col-12">
                <br />
                <div className="card">
                    <div className="card-title bg-ownStyl text-center">
                        <h3>Wydarzenie</h3>
                    </div>
                        <Event event={this.state.event} key={this.state.event.id} />
                </div>
         
            </div>
        );
    }
}
export default withAuth(withRouter(EventInfo));
