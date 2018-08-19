import React from 'react';
import axios from "axios";
import UserSettingsMenu from './UserSettingsMenu'
import {connect} from 'react-redux';
import withAuth from '../withAuth';
import { withRouter} from 'react-router-dom'
import {FormControl, FormGroup, Button, Grid} from 'react-bootstrap';
import { FormErrors } from '../FormErrors/FormErrors.js'
class ChangePasswordSubPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword : '',
            newPasswordConfirmation : '',
            oldPassword : '',
            formErrors: { newPassword: '', newPasswordConfirmation: '', oldPassword: ''},
            valuesValid: { newPassword: false, newPasswordConfirmation: false, oldPassword: false},
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
            case 'newPassword':
                if (value.length < 6) {
                    fieldValidationErrors.newPassword = 'Hasło jest za krótkie';
                    validation.newPassword = false;
                }
                else {
                    fieldValidationErrors.newPassword = '';
                    validation.newPassword = true;
                }
                break;
            case 'newPasswordConfirmation':
                if (value !== this.state.newPassword) {
                    fieldValidationErrors.newPasswordConfirmation = 'Niepoprawne potwierdzenie hasła';
                    validation.newPasswordConfirmation = false;
                }
                else {
                    fieldValidationErrors.newPasswordConfirmation = '';
                    validation.newPasswordConfirmation = true;
                }
                break;
            case 'oldPassword':
                if (value.length === 0) {
                    fieldValidationErrors.oldPassword = 'Podanie starego hasła jest wymagane';
                    validation.oldPassword = false;
                }
                else {
                    fieldValidationErrors.oldPassword = '';
                    validation.oldPassword = true;
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
            formValid: this.state.valuesValid.newPassword && this.state.valuesValid.newPasswordConfirmation
                && this.state.valuesValid.oldPassword
        });
    }

    render() {
        return (
            <Grid>
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="newPassword">
                    <FormControl name="newPassword" type="password" placeholder="Nowe hasło"
                        onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup controlId="newPasswordConfirmation">
                    <FormControl name="newPasswordConfirmation" type="password" placeholder="Potwierdz nowe hasło"
                        onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup controlId="oldPassword">
                    <FormControl name="oldPassword" type="password" id="oldPassword" placeholder="Stare hasło"
                        onChange={this.handleInputChange} />
                </FormGroup>
                <div className="text-center mt-4">
                    <Button disabled={!this.state.formValid} bsStyle="primary" bsSize="large" type="submit">Zmień hasło</Button>
                </div>
            </form>
            {
                !this.state.formValid &&
                    <div className="card">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
            }
        </Grid>
        )
    }
    
}
export default ChangePasswordSubPage;