import React from 'react';
import axios from "axios";
import UserSettingsMenu from './UserSettingsMenu'
import {connect} from 'react-redux';
import withAuth from '../withAuth';
import { withRouter} from 'react-router-dom'
import {FormControl, FormGroup,Form, Button, Grid, ControlLabel, Col, Row} from 'react-bootstrap';
import { FormErrors } from '../FormErrors/FormErrors.js'
import { BASE_URL } from '../constants';
import toastr from 'toastr';
import {userActions} from '../../actions/userActions';

class ChangeUserDataSubPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : props.id,
            firstName : props.firstName,
            lastName : props.lastName,
            email : props.email,
            formErrors: { firstName: '', lastName: '', email: ''},
            valuesValid: { firstName: true, lastName: true, email: true},
            formValid: true,
        }
    }

    handleInputChange = (event) => {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.validateField(event.target.name, event.target.value));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const request = {
            userId : this.state.userId,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email : this.state.email
        };
        axios.patch(BASE_URL + '/Account', request)
        .then(response =>{
            this.props.updateUserData(request);
            toastr.success("Dane zostały zmienione");
        })
        .catch(errors =>{
            toastr.error("Coś poszło nie tak :(");
            console.log(errors)
        })
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let validation = this.state.valuesValid;
        switch (fieldName) {
            case 'firstName':
                if (value.length == 0) {
                    fieldValidationErrors.firstName = 'Imie jest wymagane';
                    validation.firstName = false;
                }
                else {
                    fieldValidationErrors.firstName = '';
                    validation.firstName = true;
                }
                break;
            case 'lastName':
                if (value.length == 0) {
                    fieldValidationErrors.lastName = 'Nazwisko jest wymagane';
                    validation.lastName = false;
                }
                else {
                    fieldValidationErrors.lastName = '';
                    validation.lastName = true;
                }
                break;
            case 'email':
                if (value.length === 0) {
                    fieldValidationErrors.email = 'Adres email jest wymagany';
                    validation.email = false;
                }
                else {
                    fieldValidationErrors.email = '';
                    validation.email = true;
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
            formValid: this.state.valuesValid.firstName && this.state.valuesValid.lastName
                && this.state.valuesValid.email
        });
    }

    render() {
        return (
            <div>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <Row componentClass={FormGroup} controlId="firstName">
                        <Col componentClass={ControlLabel} xs={2}>
                            Imie
                        </Col>
                        <Col xs={7}>
                            <FormControl name="firstName" type="tet" placeholder="Imie" value = {this.state.firstName}
                                onChange={this.handleInputChange}/>
                        </Col>
                    </Row>
                    <Row componentClass={FormGroup} controlId="lastName">
                        <Col componentClass={ControlLabel} xs={2}>
                            Nazwisko
                        </Col>
                        <Col xs={7}>
                        <FormControl name="lastName" type="text" placeholder="Nazwisko" value = {this.state.lastName}
                            onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                    <Row componentClass={FormGroup} controlId="email">
                        <Col componentClass={ControlLabel} xs={2}>
                            Email
                        </Col>
                        <Col xs={7}>
                            <FormControl name="email" type="text" placeholder="Adres email" value = {this.state.email}
                                onChange={this.handleInputChange} />
                        </Col>
                    </Row>
                    <Row xs={9} className="text-center mt-4">
                        <Button disabled={!this.state.formValid} bsStyle="primary" bsSize="large" type="submit">Aktualizuj dane</Button>
                    </Row>
                </Form>
                {
                    !this.state.formValid &&
                        <div className="card">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                }
            </div>
        )
    }
    
}

function mapDispatchToProps(dispatch){
    return {
        updateUserData: (data) => dispatch(userActions.updateData(data))
    };
}
export default connect(null, mapDispatchToProps)(ChangeUserDataSubPage);