import React from 'react';
import moment from 'moment';
import 'moment/locale/pl';
import {Panel} from 'react-bootstrap'
import './Comment.css';
const Comment = (props) => {
        const date = moment(props.date).format('MMMM Do YYYY, h:mm');
        return (
            <Panel>
                <Panel.Heading >
                    <span className="capitalize-text">Autor: {props.user}</span> 
                    <span className="pull-right capitalize-text">{date}</span>
                </Panel.Heading>
                <Panel.Body>
                    {props.name}
                </Panel.Body>
            </Panel>
        )
 }
export default Comment;