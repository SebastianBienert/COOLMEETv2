import React from 'react';
import axios from "axios";
import { BASE_URL } from "../constants";
import withAuth from '../withAuth';
import {withRouter} from 'react-router-dom';
import { FormErrors } from '../FormErrors/FormErrors.js';
import { DatePicker } from 'antd';
import './AddEventForm.css'
import {FormControl, FormGroup, ControlLabel, Button, Panel, Row, Col} from 'react-bootstrap';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
class AddEventForm extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            country: "",
            city: "",
            description: "",
            address:"",
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
    }

    renderStatuses = () => {
        return (
            this.state.statuses.map((st) => <option value={st.id} key={st.id}>{st.description}</option>)
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
        var req = {
            name: this.state.name,
            description: this.state.description,
            startDate: this.state.startValue,
            endDate: this.state.endValue,
            country: this.state.country,
            city: this.state.city,
            address: this.state.address,
            statusId: this.state.status
        };
        const url = BASE_URL + "/Event";
        console.log("SEnding", req);
        axios.post(url, req)
            .then(result => {
                //alert("DODANO" + JSON.stringify(result));
                this.setState({ name: "",
                country: "",
                city: "",
                description: "",
                start: "",
                end: "",
                status: "1",})
                this.props.history.replace(`/eventInfo/${result.data.id}`)
            })
            .catch(function (error) {
                alert("Operacja sie nie powiodla...")
            });
    }

    getStatus() {
        axios.get(BASE_URL + "/Event/status")
            .then(response => {
                this.setState({
                    statuses: response.data
                });
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        const d = new Date();
        d.setDate(d.getDate());
        const today = d.toISOString();
        this.setState({
            start: today.substr(0, 16),
            end: today.substr(0, 16)
        });
        this.getStatus();
    }


    render() {
        const { startValue, endValue, endOpen } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h4 className="text-center">Dodaj wydarzenie!</h4>

                    <FormGroup controlId="name">
                        <FormControl name="name" type="text" placeholder="Nazwa wydarzenia"
                            onChange={this.handleInputChange} required />
                    </FormGroup>

                    <FormGroup>
                        <Row className="flex-row">
                            
                                <Col sm={5} md={5} lg={5}
                                    smOffset={1} mdOffset={1} lgOffset={1}
                                    componentClass={FormGroup} controlId="start" className="center">

                                    <Col componentClass={ControlLabel}
                                        sm={2} md={2} lg={2}>Start</Col>
                                    <Col sm={7} md={7} lg={7}  
                                            componentClass={DatePicker}
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
                                </Col>
                                <Col sm={5} md={5} lg={5}
                                    componentClass={FormGroup} controlId="end" className="center">

                                <Col componentClass={ControlLabel}
                                        sm={2} md={2} lg={2}>Koniec</Col>
                                    <Col sm={7} md={7} lg={7}
                                        componentClass={DatePicker}
                                        disabledDate={this.disabledEndDate}
                                        showTime
                                        format="DD-MM-YYYY HH:mm"
                                        value={endValue}
                                        placeholder="Koniec"
                                        onChange={this.onEndChange}
                                        open={endOpen}
                                        onOpenChange={this.handleEndOpenChange}
                                    />
                                </Col>
                            
                        </Row>
                    </FormGroup>

                    <FormGroup controlId="address">
                        <FormControl name="address" type="text" placeholder="Ulica" value={this.state.address}
                            onChange={this.handleInputChange} required />
                    </FormGroup>

                    <FormGroup controlId="city">
                        <FormControl name="city" type="text" placeholder="Miasto" value={this.state.city}
                            onChange={this.handleInputChange} required />
                    </FormGroup>

                    <FormGroup controlId="country">
                        <FormControl name="country" type="text" placeholder="Kraj" value={this.state.country}
                            onChange={this.handleInputChange} required />
                    </FormGroup>

                    <FormGroup controlId="description">
                        <FormControl name="description" type="text" placeholder="Opis" value={this.state.description}
                            onChange={this.handleInputChange} />
                    </FormGroup>

                    <FormGroup controlId="status">
                        <ControlLabel>Status</ControlLabel>
                        <FormControl componentClass="select" onChange={this.onSelectAlert}>
                            {this.renderStatuses()}
                        </FormControl>
                    </FormGroup>

                    <div className="text-center mt-4">
                        <Button className="btn-outline-secondary" disabled={!this.state.formValid} type="submit">Dodaj!</Button>
                    </div>

                </form>
                <div>
                {
                    !this.state.formValid && this.listOfErrorsNotEmpty() ?
                        <Panel>
                            <FormErrors formErrors={this.state.formErrors} />
                        </Panel>
                        :
                        null
                }
                </div>
            </div >


        )
    }
}
export default withAuth(withRouter(AddEventForm));