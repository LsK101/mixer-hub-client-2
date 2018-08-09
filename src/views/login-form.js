import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form'

import './login-form.css';
import LoadingGif from '../images/loading.gif';

export class LoginForm extends Component {
  render() {
    return (
      <div className="login-popup">
        <div className="login-popup-inner">
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
            {this.props.loading ?
              <img class="login-loading" src={LoadingGif} alt="loading" /> :
              <button className="login-form-login-button" type="submit">Log In</button> }
            <button className="login-form-cancel-button" type="button" onClick={this.props.closeLoginPopup}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'LoginForm'
})(LoginForm);