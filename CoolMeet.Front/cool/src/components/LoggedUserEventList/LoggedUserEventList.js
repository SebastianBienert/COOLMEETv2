import React from 'react';
import EventCard from "../EventCard/EventCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import withAuth from '../withAuth';
import AuthService from '../AuthService';
import ceil from 'ceil';

class LoggedUserEventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            eventsToShow: [],
            pages: [],
            currentPage: 1,
            dateAfter: "",
            dateBefore: "",
            filter: "",
            status: 0
        };
        this.AuthService = new AuthService(BASE_URL);
    }
    componentDidMount() {
        this.updateList()
    }

    updateList = () => {
        axios.get(BASE_URL + `/Event/GetLoggedUserEvents`)
        .then(response => {
            this.setState({             
                events: response.data 
            });
        })
        .catch(error => console.log(error));
        const d = new Date();
        d.setDate(d.getDate());
        const today = d.toISOString();
        const tommorow = new Date(d);
        tommorow.setDate(tommorow.getDate() + 1);
        const tommorowStringDate = tommorow.toISOString();
        axios.get(BASE_URL + `/Event/GetLoggedUserEvents`, this.AuthService.getConfigForAuthorize())
            .then(response => {
                console.log(response)
                this.setState({
                    events: response.data,
                    dateBefore: tommorowStringDate.substring(0, 16),
                    dateAfter: today.substring(0, 16),
                    filter: false
                });
                this.setPages();
            })
            .catch(error => console.log(error));
    }

    render() {
        // const eventsView = this.state.events.map(e => {
        //     return <EventCard key = {e.id} event = {e} onDelete = {this.updateList} />;
        // });
        // console.log(this.props)


        console.log(this.state.events)
        const eventsView = this.state.eventsToShow.map(e => {
            return <EventCard key={e.id} event={e} onDelete = {this.updateList} />;
        });
        const pagesView = this.state.pages.map(e => {
            const name = "page-" + e;
            const cName = e === this.state.currentPage ? "btn btn-danger" : "btn btn-primary";
            return (
                <li className="page-item" key={name}>
                    <button className={cName} value={e} disabled={e === this.state.currentPage} onClick={() => this.reachPage(e)}>{e}
                    </button>
                </li>
            )
        });
        return (
            <div className="col-12">
                <br />
                <div className="card">
                    <div className="card-title bg-primary text-center">
                        <h3>Lista wydarzeń</h3>
                    </div>
                    <div className="row">
                        <div className="col-1" />
                        <div className="col-5">
                            <div className="form-group">
                                <label htmlFor="start">Od:</label>
                                <input name="dateAfter" type="datetime-local" value={this.state.dateAfter}
                                    id="dateAfter" placeholder="Czas startu" onChange={this.handleInputChange} className="form-control" />
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="form-group">
                                <label htmlFor="end">Do:</label>
                                <input name="dateBefore" type="datetime-local" value={this.state.dateBefore}
                                    id="dateBefore" onChange={this.handleInputChange} className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1" />
                        <div className="form-group col-5">
                            <select className="form-control" id="status" onChange={this.onSelectAlert}>
                                <option value={0} key={0}>Wszystkie</option>
                                <option value={1} key={1}>Tylko aktywne</option>
                                <option value={2} key={2}>Tylko nieaktywne</option>
                            </select>
                        </div>
                        <div className="col-5 checkbox">
                            <label style={{ position: 'relative', bottom: -6 + 'px', right: -20 + 'px' }}>
                                <input id="filter" name="filter-cbx" type="checkbox"
                                    checked={this.state.filter} className="form-check-input"
                                    onChange={this.handleChecked} />Filtruj</label>
                        </div>
                    </div>
                    <div className="card-body">
                        {eventsView}
                    </div>
                </div>
                <div>
                    <ul className="pagination">
                        {pagesView}
                    </ul>
                </div>
            </div>);
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
        const onPage = 5;
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
            //for (var i = 1; i <= ceil(this.state.events.length / onPage); i++) {
            pagesList.push(i);
        }
        this.setState({
            pages: pagesList,
            //eventsToShow: this.state.events.slice(listStart, listStart + onPage)
            eventsToShow: evList.slice(listStart, listStart + onPage)
        });
    }
    reachPage(e) {
        this.setState({
            currentPage: e
        }, () => this.setPages());
    }
}
export default withAuth(LoggedUserEventList);