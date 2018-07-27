import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form'

import './login-form.css';

export class LoginForm extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <form
            onSubmit={this.props.handleSubmit(values => this.props.onSubmitLogin(values))}>
            <label className="login-form-label" htmlFor="username">Username</label>
            <br/>
            <Field className="login-form-username-input" 
              name="username" id="username" type="text" component="input" />
            <br/>
            <label className="login-form-label" htmlFor="password">Password</label>
            <br/>
            <Field className="login-form-password-input"
              name="password" id="password" type="password" component="input" />
            <br/>
            <button className="login-form-login-button" type="submit">Log In</button>
            <button className="login-form-cancel-button" type="button" onClick={this.props.closePopup}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'LoginForm'
})(LoginForm);