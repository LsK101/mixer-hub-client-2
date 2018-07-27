import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form'

import './signup-form.css';

export class SignupForm extends Component {
  render() {
    return (
      <div className="signup-popup">
        <div className="signup-popup-inner">
          <form
            onSubmit={this.props.handleSubmit(values => this.props.onSubmitSignup(values))}>
            <label className="signup-form-label" htmlFor="firstname">First Name</label>
            <br/>
            <Field className="signup-form-username-input" 
              name="firstname" id="firstname" type="text" component="input" />
            <br/>
            <label className="signup-form-label" htmlFor="username">New Username</label>
            <br/>
            <Field className="signup-form-username-input" 
              name="username" id="username" type="text" component="input" />
            <br/>
            <label className="signup-form-label" htmlFor="password">New Password</label>
            <br/>
            <Field className="signup-form-password-input"
              name="password" id="password" type="password" component="input" />
            <br/>
            <label className="signup-form-label" htmlFor="confirm">Confirm Password</label>
            <br/>
            <Field className="signup-form-password-input"
              name="confirm" id="confirm" type="password" component="input" />
            <br/>
            <button className="signup-form-signup-button" type="submit">Sign Up</button>
            <button className="signup-form-cancel-button" type="button" onClick={this.props.closeSignupPopup}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'SignupForm'
})(SignupForm);