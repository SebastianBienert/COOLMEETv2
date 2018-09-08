import React from 'react';
import axios from "axios";
import { BASE_URL } from "../constants";
import withAuth from '../withAuth';
import { FormErrors } from '../FormErrors/FormErrors.js';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { withRouter} from 'react-router-dom'
import moment from 'moment';
import {FormControl, FormGroup, ControlLabel, Button, Panel, Row, Col, Form, Grid} from 'react-bootstrap';
import toastr from 'toastr';

class EditEventSubPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name || "",
            country: props.country,
            address: props.address,
            city: props.city,
            description: props.description,
            start: props.startDate,
            end: props.endDate,
            status: props.status,
            statuses: [],
            formErrors: { name: '', city: '', start: '', end: '', country: '', address: '' },
            valuesValid: { name: true, city: true, start: true, end: true, country: true, address: true },
            startValue: moment(props.startDate),
            endValue: moment(props.endDate),
            endOpen: false,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            id: nextProps.id,
            name: nextProps.name,
            country: nextProps.country,
            address: nextProps.address,
            city: nextProps.city,
            description: nextProps.description,
            start: nextProps.startDate,
            end: nextProps.endDate,
            status: nextProps.status,
            startValue: moment(nextProps.startDate),
            endValue: moment(nextProps.endDate),
        })
    }

    renderStatuses = () => {
        return (
            this.state.statuses.map((st) =>{
                    if(st.id === this.state.status)
                        return <option value={st.id} key={st.id} selected >{st.description}</option>
                    else
                        return <option value={st.id} key={st.id}>{st.description}</option>
                })
        );
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
            startDate: this.state.startValue,
            endDate: this.state.endValue,
            country: this.state.country,
            city: this.state.city,
            address: this.state.address,
            statusId: this.state.status.id,
        };
        axios.patch(`${BASE_URL}/Event/${this.state.id}`, request)
            .then(result => {
                toastr.success("Wydarzenie zostało zmienione");
                this.props.history.replace(`/eventInfo/${this.state.id}`)
            })
            .catch(function (error) {
                toastr.error("Operacja nie powiodła się");
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
        this.getStatus();
    }


    render() {
        const { startValue, endValue, endOpen } = this.state;
        return (
            <Grid fluid>
                <Form onSubmit={this.handleSubmit}>
                    <h1 style={{'marginTop' : '10px', 'marginBottom':'20px'}} className="h3 font-weight-normal text-center">Edytuj wydarzenie</h1>
                    <FormGroup controlId="name">
                        <ControlLabel>Nazwa wydarzenia</ControlLabel>
                        <FormControl name="name" type="text" placeholder="Nazwa wydarzenia" value={this.state.name}
                            onChange={this.handleInputChange} className="form-control" required />
                    </FormGroup>

                    <FormGroup style={{'marginBottom' : '0px !important'}}>
                        <Row className="flex-row">
                             <Col sm={5} md={5} lg={5}
                                    smOffset={1} mdOffset={1} lgOffset={1}
                                    componentClass={FormGroup} controlId="start" className="center">

                                    <Col componentClass={ControlLabel}
                                        sm={2} md={2} lg={2}>Start</Col>
                                    <Col xs={7}
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

                                <Col xs={7}
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
                        <ControlLabel>Adres</ControlLabel>
                        <FormControl name="address" type="text" placeholder="Ulica" value={this.state.address}
                            onChange={this.handleInputChange} required />
                    </FormGroup>

                    <FormGroup controlId="city">
                        <ControlLabel>Miasto</ControlLabel>
                        <FormControl name="city" type="text" placeholder="Miasto" value={this.state.city}
                            onChange={this.handleInputChange} required />
                    </FormGroup>

                    <FormGroup controlId="country">
                        <ControlLabel>Kraj</ControlLabel>
                        <FormControl name="country" type="text" placeholder="Kraj" value={this.state.country}
                            onChange={this.handleInputChange} required />
                    </FormGroup>

                    <FormGroup controlId="description">
                        <ControlLabel>Opis</ControlLabel>
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
                        <Button className="btn btn-outline-secondary" disabled={!this.state.formValid} type="submit">Edytuj!</Button>
                    </div>
                </Form>
                <div>
                {
                    !this.state.formValid &&
                        <div className="card">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                }
                </div>
            </Grid >


        )
    }
}

export default withAuth(withRouter(EditEventSubPage));