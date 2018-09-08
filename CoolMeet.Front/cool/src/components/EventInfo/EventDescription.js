import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from 'moment';
import {BASE_URL, DEFAULT_EVENT} from "../constants";
import Map from '../Map/Map';
import CommentsList from '../CommentsList/CommentsList';
import { TagCloud } from "react-tagcloud";
import {ListGroupItem, ListGroup} from 'react-bootstrap';

class EventDescription extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: props.event.users || [],
            statusUnavailable: props.event.status.description === "Niedostępny",
        }
    }

    componentWillReceiveProps(newState) {
        this.setState( prevState => ({
            users: newState.event.users || [],
        }))
    }
    
    joinEvent = () => {
        axios({ method: 'POST', url: `${BASE_URL}/Event/join/${this.props.event.id}`})
        .then(response =>{
            console.info(`Join ${this.props.event.name}`);
            this.setState( prevState =>{
                return{
                    users: [...prevState.users, response.data],
                }
            })
        })
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    customRenderer = (tag, size, color) => {
        return <span key={tag.value} style={{color}} className={`tag-${size} badge`}>{tag.value}</span>;
    };
    
    render() {
        const colorOptions = {
            luminosity: 'light',
            hue: 'blue'
          };
        const tagData = this.props.event.tags.map(tag => {
            return{
                    key : tag.id,
                    value : `#${tag.name}`,
                    count : 10
        }});
        const event = this.props.event.id ? this.props.event : DEFAULT_EVENT;
        const address = `${event.country} ${event.city} ${event.address}`;
        const startDate = moment(event.startDate).format('MMMM Do YYYY, h:mm');
        const endDate = moment(event.endDate).format('MMMM Do YYYY, h:mm');
        return (
            <ListGroup>
                    <ListGroupItem header="Opis">
                        {event.description}
                    </ListGroupItem>
                    <ListGroupItem header="Data startu" style={{'text-transform' : 'capitalize'}}>
                        {startDate}
                    </ListGroupItem>
                    <ListGroupItem header="Data konca" style={{'text-transform' : 'capitalize'}}>
                        {endDate}
                    </ListGroupItem>
                    <ListGroupItem header="Adres">
                        {event.country}, {event.city}, {event.address}
                    </ListGroupItem>
                    <ListGroupItem header="Status">
                        {event.status.description}
                    </ListGroupItem>
                    {tagData.length > 0 &&
                    <ListGroupItem>
                        <TagCloud minSize={12}
                                maxSize={35}
                                tags={tagData}
                                colorOptions={colorOptions}
                                renderer={this.customRenderer}
                                onClick={tag => alert(`'${tag.value}' was selected!`)} />
                    </ListGroupItem>
                    }
            </ListGroup>
      );
    }
}

Event.propTypes = {
  event: PropTypes.object.isRequired
};

export default EventDescription;