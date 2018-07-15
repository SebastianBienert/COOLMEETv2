import React from 'react';
import EventCard from "../EventCard/EventCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import withAuth from '../withAuth';
import AuthService from '../AuthService';
import ceil from 'ceil';
import {Panel, Col, Row, Button, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom'
class EventsListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: this.props.events,
            eventsToShow: [],
            pages: [],
            currentPage: 1,
            dateAfter: this.props.dateAfter,
            dateBefore: this.props.dateBefore,
            filter: this.props.filter,
            status: 0
        };
        this.AuthService = new AuthService(BASE_URL);
        console.log("PROPS: ", this.props)
        console.log("STATE:", this.state)
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            events: nextProps.events,
            dateAfter: nextProps.dateAfter,
            dateBefore: nextProps.dateBefore,
            filter: nextProps.filter
        }, () => this.setPages());
    }
    
    render() {
        console.log("PROPS FROM RENDER:", this.props)
        console.log("STATE FROM REDNER:", this.state)
        const eventsView = this.state.eventsToShow.map(e => {
            return <EventCard key={e.id} event={e}  />;
        });
        const pagesView = this.state.pages.map(e => {
            const name = "page-" + e;
            const cName = e === this.state.currentPage ? "danger" : "primary";
            return (
                <li className="page-item" key={name}>
                    <Button bsStyle={cName} value={e} disabled={e === this.state.currentPage} onClick={() => this.reachPage(e)}>{e}
                    </Button>
                </li>
            )
        });
        return (
            <div className="col-12">
                <br />
                <Panel bsStyle="primary">
                    <Panel.Heading className="text-center">
                        <Panel.Title componentClass="h3">Lista wydarzeń</Panel.Title>
                    </Panel.Heading>
                   
                    <Row className="show-grid" style={{padding: '20px'}}>
                        <Col xs={1} md={1} lg={1}/>
                        <Col xs={3} md={3} lg={3}>
                            <FormGroup controlId="start">
                                <ControlLabel>Od:</ControlLabel>
                                <FormControl name="dateAfter" type="datetime-local" value={this.state.dateAfter}
                                     placeholder="Czas startu" onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col xs={3} md={3} lg={3}>
                            <FormGroup controlId="end">
                                <ControlLabel>Do:</ControlLabel>
                                <FormControl name="dateBefore" type="datetime-local" value={this.state.dateBefore}
                                     onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col xs={3} md={3} lg={3}>
                            <FormGroup controlId="status">
                                <ControlLabel>Status:</ControlLabel>
                                <FormControl componentClass="select" onChange={this.onSelectAlert}>
                                    <option value={0} key={0}>Wszystkie</option>
                                    <option value={1} key={1}>Tylko aktywne</option>
                                    <option value={2} key={2}>Tylko nieaktywne</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={1} md={1} lg={1} className="checkbox" style={{paddingTop: '10px'}} >
                            <Checkbox id="filter" name="filter-cbx" type="checkbox"
                                        checked={this.state.filter} className="form-check-input"
                                        onChange={this.handleChecked}>
                             <ControlLabel style={{fontSize: '14px', fontWeight: '700', paddingLeft: '0px'}}>Filtruj</ControlLabel>
                            </Checkbox>
                        </Col>

                    </Row>
                    <Panel.Body>
                        {eventsView}
                    </Panel.Body>
                </Panel>
                <div>
                    <ul className="pagination">
                        {pagesView}
                    </ul>
                </div>
            </div>
        );
    }
    onSelectAlert = (event) => {
        const val = parseInt(event.target.value, 10);
        this.setState({
            status: val
        }, () => this.setPages());
    }
    handleInputChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        }, () => this.checkIfDatesCorrect(name));
    }
    handleChecked = (event) => {
        this.setState({
            filter: event.target.checked
        }, () => this.setPages());
    }
    checkIfDatesCorrect(date) {
        if (this.state.dateAfter > this.state.dateBefore) {
            if (date === "dateAfter") {
                this.setState({
                    dateBefore: this.state.dateAfter
                });
            }
            else {
                this.setState({
                    dateAfter: this.state.dateBefore
                });
            }
        }
    }
    setPages() {
        const onPage = 2;
        const pagesList = [];
        const evList = [];
        const all = this.state.filter;
        const date1 = this.state.dateAfter;
        const date2 = this.state.dateBefore;
        const status = this.state.status;
        this.state.events.map(event => {
            if ((event.status.id === status || status === 0) && (!all 
                || (event.endDate >= date1 && event.endDate <= date2)
                || (event.startDate >= date1 && event.startDate <= date2))) {
                evList.push(event);
            }
        });
        const listStart = onPage * (this.state.currentPage - 1);
        for (var i = 1; i <= ceil(evList.length / onPage); i++) {
            pagesList.push(i);
        }
        this.setState({
            pages: pagesList,
            //eventsToShow: this.state.events.slice(onPage, onPage + 2)
            eventsToShow: evList.slice(listStart, listStart + onPage)
        });
    }
    reachPage(e) {
        this.setState({
            currentPage: e
        }, () => this.setPages());
    }
}
export default withAuth(withRouter(EventsListComponent));