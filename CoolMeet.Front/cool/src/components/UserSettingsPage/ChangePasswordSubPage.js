import React from 'react';
import axios from "axios";
import {connect} from 'react-redux';
import {FormControl, FormGroup,Form, Button, ControlLabel, Col, Row} from 'react-bootstrap';
import { FormErrors } from '../FormErrors/FormErrors.js'
import { BASE_URL } from '../constants';
import {userActions} from '../../actions/userActions';
import toastr from 'toastr';

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

    handleSubmit = (event) =>{
        event.preventDefault();
        const request = {
            newPassword : this.state.newPassword,
            newPasswordConfirmation : this.state.newPasswordConfirmation,
            oldPassword : this.state.oldPassword
        }
        axios.patch(BASE_URL + '/Account/password', request)
        .then(response =>{
            toastr.success("Hasło zostało zmienione");
            this.props.logout();
        })
        .catch(errors =>{
            toastr.error("Wprowadzono złe hasło");
            console.log(errors)
        })
    }

    render() {
        return (
            <div>
            <Form horizontal onSubmit={this.handleSubmit}>
                <Row componentClass={FormGroup}  controlId="newPassword">
                    <Col componentClass={ControlLabel} xs={2}>
                        Nowe hasło
                    </Col>
                    <Col xs={7}>
                        <FormControl name="newPassword" type="password" placeholder="Nowe hasło" value={this.state.newPassword}
                            onChange={this.handleInputChange}/>
                    </Col>
                </Row>
                <Row componentClass={FormGroup} controlId="newPasswordConfirmation">
                    <Col componentClass={ControlLabel} xs={2}>
                        Potwierdź hasło
                    </Col>
                    <Col xs={7}>
                        <FormControl name="newPasswordConfirmation" type="password" placeholder="Potwierdz nowe hasło" value={this.state.newPasswordConfirmation}
                            onChange={this.handleInputChange} />
                    </Col>
                </Row>
                <Row componentClass={FormGroup}  controlId="oldPassword">
                    <Col componentClass={ControlLabel} xs={2}>
                        Stare hasło
                    </Col>
                    <Col xs={7}>
                        <FormControl name="oldPassword" type="password" id="oldPassword" placeholder="Stare hasło" value = {this.state.oldPassword}
                            onChange={this.handleInputChange} />
                    </Col>
                </Row>
                <Row xs={9} className="text-center mt-4">
                    <Button disabled={!this.state.formValid} bsStyle="primary" bsSize="large" type="submit">Zmień hasło</Button>
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
        logout: () => dispatch(userActions.logout())
    };
}
export default connect(null, mapDispatchToProps)(ChangePasswordSubPage);