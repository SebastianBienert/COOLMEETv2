import React from 'react';
import './LoginPage.css'
import {connect} from 'react-redux';
import {userActions} from '../../actions/userActions'
import { FormErrors } from '../FormErrors/FormErrors.js'
import toastr from 'toastr';
import {Panel} from 'react-bootstrap';
class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false
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
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Adres ma nieprawidłowy format';
        break;
      case 'password':
        if (value.length < 6) {
          fieldValidationErrors.password = 'Hasło jest za krótkie';
          passwordValid = false;
        }
        else {
          fieldValidationErrors.password = '';
          passwordValid = true;
        }
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm = () => {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  componentWillReceiveProps(nextProps){
    if(!!nextProps.logginFailure) {
        toastr.error("Logowanie nie powiodło sie");
    }
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.history.replace('/');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(userActions.login(this.state.email, this.state.password))
  }

  render() {
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal text-center">Zaloguj się</h1>
          <label htmlFor="email" className="sr-only">Adres email</label>
          <input name="email" type="email" id="inputEmail" className="form-control" placeholder="Adres email" onChange={this.handleInputChange} required autoFocus />
          <label htmlFor="password" className="sr-only">Hasło</label>
          <input name="password" type="password" id="inputPassword" className="form-control" placeholder="Hasło" onChange={this.handleInputChange} required />
          <button className="btn btn-lg btn-primary btn-block" disabled={!this.state.formValid} type="submit">Zaloguj się</button>
        </form>
        {
          !this.state.formValid && (this.state.formErrors.email.length > 0 || this.state.formErrors.password.length > 0) ?
            <Panel>
              <FormErrors formErrors={this.state.formErrors} />
            </Panel>
            :
            null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, loggedIn, logginFailure } = state.authentication;
  return {
      loggingIn,
      loggedIn,
      logginFailure
  };
}

export default connect(mapStateToProps)(LoginPage);