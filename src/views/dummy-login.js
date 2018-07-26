import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form'

export class DummyLogin extends Component {
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(values => this.props.onSubmitLogin(values))}>
        <label htmlFor="username">Username:</label>
        <Field name="username" id="username" type="text" component="input" />
        <label htmlFor="password">Password:</label>
        <Field name="password" id="password" type="password" component="input" />
        <button type="submit">Log In</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'LoginForm'
})(DummyLogin);