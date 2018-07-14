import React from 'react';
import axios from "axios";
import { BASE_URL } from "../constants";
import withAuth from '../withAuth';
import AuthService from '../AuthService';
import { FormErrors } from '../FormErrors/FormErrors.js';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment';
class EditEvent extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            name: "",
            country: "",
            city: "",
            description: "",
            start: "",
            end: "",
            status: "1",
            statuses: [],
            formErrors: { name: '', city: '', start: '', end: '', country: '', address: '' },
            valuesValid: { name: false, city: false, start: false, end: false, country: false, address: false },
            startValue: null,
            endValue: null,
            endOpen: false,
        };
        this.AuthService = new AuthService(BASE_URL);
    }

    renderStatuses = () => {
        console.log("Statuses: " + this.state.statuses);
        return (
            this.state.statuses.map((st) =>{
                    if(st.id === this.state.status)
                        return <option value={st.id} key={st.id} selected >{st.description}</option>
                    else
                        return <option value={st.id} key={st.id}>{st.description}</option>
                })
        );
    }

    listOfErrorsNotEmpty = () => {
        for (var key in this.state.formErrors) {
            if (this.state.formErrors.hasOwnProperty(key)) {
                if(this.state.formErrors[key].length > 0)
                    return true;
            }
        }
        return false;
    }

    handleInputChange = (event) => {
        event.persist()
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.validateField(event.target.name, event.target.value));
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let validation = this.state.valuesValid;
        switch (fieldName) {
            case 'name':
                if (value.length === 0) {
                    fieldValidationErrors.name = 'Nazwa wydarzenia jest wymagana!';
                    validation.name = false;
                }
                else {
                    fieldValidationErrors.name = '';
                    validation.name = true;
                }
                break;
            case 'city':
                if (value.length === 0) {
                    fieldValidationErrors.city = 'Miasto wydarzenia jest wymagana!';
                    validation.city = false;
                }
                else {
                    fieldValidationErrors.city = '';
                    validation.city = true;
                }
                break;
            case 'start':
                if (value.length === 0) {
                    fieldValidationErrors.start = 'Data rozpoczęcia jest wymagana!';
                    validation.start = false;
                }
                else {
                    fieldValidationErrors.start = '';
                    validation.start = true;
                }
                break;
            case 'end':
                if (value.length === 0) {
                    fieldValidationErrors.end = 'Data zakończenia wydarzenia jest wymagana!'
                    validation.end = false;
                }
                else {
                    fieldValidationErrors.lastName = '';
                    validation.lastName = true;
                }
                break;
            case 'country':
                if (value.length === 0) {
                    fieldValidationErrors.country = 'Kraj jest wymagany!';
                    validation.country = false;
                }
                else {
                    fieldValidationErrors.country = '';
                    validation.country = true;
                }
                break;
            case 'address':
                if (value.length === 0) {
                    fieldValidationErrors.address = 'Adres jest wymagany!';
                    validation.address = false;
                }
                else {
                    fieldValidationErrors.address = '';
                    validation.address = true;
                }
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            valuesValid: validation
        }, this.validateForm);
    }
    validateForm = () => {
        this.setState({
            formValid: this.state.valuesValid.name
                && this.state.city && this.state.valuesValid.start
                && this.state.end && this.state.valuesValid.country
                && this.state.valuesValid.address
        });
    }

    onSelectAlert = (event) => {
        console.log(event.target.value);
        this.setState({
            status: event.target.value
        });
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
        this.setState(
            {
                start: value != null ? value.format('llll') : ""
            }, () => this.validateField("start", value != null ? value.format('llll') : ""));
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
        this.setState(
            {
                end: value != null ? value.format('llll') : ""
            }, () => this.validateField("end", value != null ? value.format('llll') : ""));
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        var request = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            startDate: this.state.start,
            endDate: this.state.end,
            country: this.state.country,
            city: this.state.city,
            address: this.state.address,
            statusId: this.state.status,
        };
        const url = BASE_URL + "/Event";

        axios.put(url, request, this.AuthService.getConfigForAuthorize())
            .then(result => {
                this.props.history.replace(`/eventInfo/${this.state.id}`)
            })
            .catch(function (error) {
                alert("Operacja sie nie powiodla...")
            });
    }

    getStatus() {
        axios.get(BASE_URL + "/Event/status", this.AuthService.getConfigForAuthorize())
            .then(response => {
                this.setState({
                    statuses: response.data
                });
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getStatus();
        axios.get(BASE_URL + `/Event/eventInfo/${this.props.match.params.id}`, this.AuthService.getConfigForAuthorize())
        .then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                country: response.data.country,
                city: response.data.city,
                description: response.data.description,
                address: response.data.address,
                start: response.data.startDate,
                end: response.data.endDate,
                status: response.data.status.id,
                formErrors: { name: '', city: '', start: '', end: '', country: '', address: '' },
                valuesValid: { name: true, city: true, start: true, end: true, country: true, address: true },
                formValid: true,
                endOpen: false,
                startValue: moment(response.data.startDate),
                endValue: moment(response.data.endDate)
            });
            console.log("Data: ", this.response.data)
        })
        .catch(error => console.log(error));

    }


    render() {
        const { startValue, endValue, endOpen } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h4 className="text-center">Edytuj wydarzenie!</h4>

                    <div className="form-group">
                        <input name="name" type="text" placeholder="Nazwa wydarzenia" id="name" value={this.state.name}
                            onChange={this.handleInputChange} className="form-control" required />
                    </div>

                    <div className="flex-row">
                        <div className="form-group center">
                            <label htmlFor="start" className="offset-2 col-1">Start</label>
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                showTime
                                format="DD-MM-YYYY HH:mm"
                                value={startValue}
                                placeholder="Start"
                                onChange={this.onStartChange}
                                name="start"
                                required
                                onOpenChange={this.handleStartOpenChange}
                            />
                            <label htmlFor="end" className="offset-1 col-1">Koniec</label>
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                showTime
                                format="DD-MM-YYYY HH:mm"
                                value={endValue}
                                placeholder="Koniec"
                                onChange={this.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input name="address" type="text" id="address" placeholder="Ulica" value={this.state.address}
                            onChange={this.handleInputChange} className="form-control" required />
                    </div>


                    <div className="form-group">
                        <input name="city" type="text" id="city" placeholder="Miasto" value={this.state.city}
                            onChange={this.handleInputChange} className="form-control" required />
                    </div>

                    <div className="form-group">
                        <input name="country" type="text" id="country" placeholder="Kraj" value={this.state.country}
                            onChange={this.handleInputChange} className="form-control" required />
                    </div>

                    <div className="form-group">
                        <input name="description" type="text" id="description" placeholder="Opis" value={this.state.description}
                            onChange={this.handleInputChange} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select className="form-control" id="status" onChange={this.onSelectAlert}>
                            {this.renderStatuses()}
                        </select>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-outline-secondary" disabled={!this.state.formValid} type="submit">Edytuj!</button>
                    </div>
                </form>
                <div>
                {
                    !this.state.formValid && this.listOfErrorsNotEmpty() ?
                        <div className="card">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        :
                        null
                }
                </div>
            </div >


        )
    }
}

export default withAuth(withRouter(EditEvent));