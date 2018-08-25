import React from 'react';
import axios from "axios";
import { BASE_URL } from "../constants";
import { FormErrors } from '../FormErrors/FormErrors.js'
import {FormControl, FormGroup, Button, Grid} from 'react-bootstrap';
class RegisterPage extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            formErrors: { email: '', password: '', firstName: '', lastName: '', userName: '' },
            valuesValid: { email: false, password: false, firstName: false, lastName: false, userName: false },
            formValid: true,
        }
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
            case 'email':
                validation.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = validation.email ? '' : 'Adres ma nieprawidłowy format';
                break;
            case 'password':
                if (value.length < 6) {
                    fieldValidationErrors.password = 'Hasło jest za krótkie';
                    validation.password = false;
                }
                else {
                    fieldValidationErrors.password = '';
                    validation.password = true;
                }
                break;
            case 'firstName':
                if (value.length === 0) {
                    fieldValidationErrors.firstName = 'Imie jest wymagane';
                    validation.firstName = false;
                }
                else {
                    fieldValidationErrors.firstName = '';
                    validation.firstName = true;
                }
                break;
            case 'lastName':
                if (value.length === 0) {
                    fieldValidationErrors.lastName = 'Nazwisko jest wymagane';
                    validation.lastName = false;
                }
                else {
                    fieldValidationErrors.lastName = '';
                    validation.lastName = true;
                }
                break;
            case 'userName':
                if (value.length === 0) {
                    fieldValidationErrors.userName = 'Nazwa użytkownika jest wymagana';
                    validation.userName = false;
                }
                else {
                    fieldValidationErrors.userName = '';
                    validation.userName = true;
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
        //console.log(this.state.valuesValid);
        this.setState({
            formValid: this.state.valuesValid.email && this.state.valuesValid.password
                && this.state.valuesValid.firstName && this.state.valuesValid.lastName && this.state.valuesValid.userName
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const url = BASE_URL + '/user';
        const request = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password
        }
        axios.post(url, request)
            .then(response => {
                this.props.history.replace(`/login`);
            })
            .catch(response => {
                console.log(response);
            });
        event.preventDefault();
    }

    render() {
        return (
            <Grid>
                <form onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal text-center">Zarejestruj się</h1>
                    <FormGroup controlId="firstName">
                        <FormControl name="firstName" type="text" placeholder="Imie"
                            onChange={this.handleInputChange}/>
                    </FormGroup>
                    <FormGroup controlId="lastName">
                        <FormControl name="lastName" type="text" placeholder="Nazwisko"
                            onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup controlId="userName">
                        <FormControl name="userName" type="text" id="userName" placeholder="Nazwa uzytkownika"
                            onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup controlId="email">
                        <FormControl name="email" type="text" id="email" placeholder="Email"
                            onChange={this.handleInputChange}/>
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormControl name="password" type="password" placeholder="Hasło"
                            onChange={this.handleInputChange}/>
                    </FormGroup>
                    <div className="text-center mt-4">
                        <Button disabled={!this.state.formValid} bsStyle="primary" bsSize="large" type="submit">Zarejestruj</Button>
                    </div>
                </form>
                {
                    !this.state.formValid ?
                        <div className="card">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        :
                        null
                }
            </Grid>
        );
    }
}
export default RegisterPage;