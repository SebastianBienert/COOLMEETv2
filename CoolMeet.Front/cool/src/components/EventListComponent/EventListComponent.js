import React from 'react';
import EventCard from "../EventCard/EventCard";
import withAuth from '../withAuth';
import ceil from 'ceil';
import { DatePicker } from 'antd';
import {Panel, Col, Row, Button, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import moment from 'moment'
class EventsListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: this.props.events,
            eventsToShow: [],
            pages: [],
            currentPage: 1,
            dateStartFilter: this.props.dateStartFilter,
            dateEndFilter: this.props.dateEndFilter,
            filter: this.props.filter,
            pageSize: this.props.pageSize,
            status: 0,
            endOpen: false,
        };
        console.log("PROPS: ", this.props)
        console.log("STATE:", this.state)
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            events: nextProps.events,
            dateStartFilter: nextProps.dateStartInitialFilter,
            dateEndFilter: nextProps.dateEndInitialFilter,
            filter: nextProps.filter,
            pageSize: nextProps.pageSize
        }, () => this.setPages());
    }
    
    render() {
        console.log("PROPS FROM RENDER:", this.props)
        console.log("STATE FROM REDNER:", this.state)
        const { endOpen } = this.state;
        const eventsView = this.state.eventsToShow.map(e => {
            return <EventCard key={e.id} event={e}  />;
        });
        const pagesView = this.state.pages.map(e => {
            const name = "page-" + e;
            const cName = e === this.state.currentPage ? "danger" : "primary";
            return (
                <li className="page-item" key={name}>
                    <Button bsStyle={cName} value={e} disabled={e === this.state.currentPage} onClick={() => this.changePage(e)}>{e}
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
                                <FormControl componentClass={DatePicker}
                                             name="dateAfter" type="datetime-local"
                                             value={this.state.dateStartFilter}
                                             disabledDate={this.disabledStartDate}
                                             showTime
                                             format="DD-MM-YYYY HH:mm"
                                             placeholder="Start"
                                             onChange={this.onStartChange}
                                             required
                                             onOpenChange={this.handleStartOpenChange} />
                            </FormGroup>
                        </Col>
                        <Col xs={3} md={3} lg={3}>
                            <FormGroup controlId="end">
                                <ControlLabel>Do:</ControlLabel>
                                <FormControl componentClass={DatePicker}
                                             name="dateBefore" type="datetime-local"
                                             value={this.state.dateEndFilter} placeholder="Koniec" 
                                             disabledDate={this.disabledStartDate}
                                             showTime
                                             format="DD-MM-YYYY HH:mm"
                                             onChange={this.onEndChange}
                                             required
                                             open={endOpen}
                                             onOpenChange={this.handleEndOpenChange}/>
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
        if (this.state.dateStartFilter > this.state.dateEndFilter) {
            if (date === "dateAfter") {
                this.setState({
                    dateEndFilter: this.state.dateStartFilter
                });
            }
            else {
                this.setState({
                    dateStartFilter: this.state.dateEndFilter
                });
            }
        }
    }

    onStartChange = (value) => {
        this.setState(
            {
                dateStartFilter: value != null ? value : ""
            });
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    onEndChange = (value) => {
        this.setState(
            {
                dateEndFilter: value != null ? value : ""
            });
    }

    setPages() {
        const pagesList = [];
        const evList = [];
        const all = this.state.filter;
        const startDateFilter = moment.utc(this.state.dateStartFilter)
        const endDateFilter = moment.utc(this.state.dateEndFilter);
        const status = this.state.status;

        this.state.events.map(event => {
            const endIsInRange = moment(event.endDate).isBetween(startDateFilter, endDateFilter);
            if ( (event.status.id === status || status === 0) && (!all || endIsInRange))
            {
                evList.push(event);
            }
        });
        const listStart = this.state.pageSize * (this.state.currentPage - 1);
        for (var i = 1; i <= ceil(evList.length / this.state.pageSize); i++) {
            pagesList.push(i);
        }
        this.setState({
            pages: pagesList,
            eventsToShow: evList.slice(listStart, listStart + this.state.pageSize)
        });
    }
    changePage(e) {
        this.setState({
            currentPage: e
        }, () => this.setPages());
    }
}
export default withAuth(withRouter(EventsListComponent));