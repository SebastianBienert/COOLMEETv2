import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pl';
export default class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const dateMoment = moment(this.props.date)
        const date = dateMoment.format('MMMM Do YYYY, h:mm');
        return (
            <div className="card">
                <div className="card-header capitalize-text">
                    Autor: {this.props.user} <p className="pull-right">{date} </p>
                </div>
                <div className="card-body">
                {this.props.name}
                </div>
            </div>
        )
    }
}