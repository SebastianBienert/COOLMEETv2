import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pl';
import {Panel} from 'react-bootstrap'
import './Comment.css';
export default class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const date = moment(this.props.date).format('MMMM Do YYYY, h:mm');
        return (
            <Panel>
                <Panel.Heading >
                    <span className="capitalize-text">Autor: {this.props.user}</span> 
                    <span className="pull-right capitalize-text">{date}</span>
                </Panel.Heading>
                <Panel.Body>
                    {this.props.name}
                </Panel.Body>
            </Panel>
        )
    }
}