import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import {changeCurrentUser,
        setAuthToken,
        showLoginPopup} from '../actions';
import {API_BASE_URL} from '../config';

import './header-bar.css';
import LoginForm from './login-form'

export class App extends Component {
  componentWillMount() {
    let localToken = localStorage.getItem('authToken');
    let localUser = localStorage.getItem('currentUser');
    if (localToken !== null) {
      return fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localToken}`
        }
      })
      .then(res => res.json())
      .then(json => {
      const authToken = json.authToken;
      const decodedToken = jwtDecode(authToken);
      this.setAuthToken(authToken);
      this.changeCurrentUser(decodedToken.user.username)
      this.storeAuthInfo(authToken,decodedToken.user.username);
      })
      .catch(err => alert(err))
    }
  }

  changeCurrentUser(user) {
    this.props.dispatch(changeCurrentUser(user));
  }

  setAuthToken(authToken) {
    this.props.dispatch(setAuthToken(authToken));
  }

  showLoginPopup() {
    this.props.dispatch(showLoginPopup(true));
  }

  hideLoginPopup() {
    this.props.dispatch(showLoginPopup(false));
  }

  getAuthToken(values) {
    return fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": values.username.toLowerCase(),
        "password": values.password
      })
    })
    .then(res => res.json())
    .then(json => {
      const authToken = json.authToken;
      const decodedToken = jwtDecode(authToken);
      this.setAuthToken(authToken);
      this.changeCurrentUser(decodedToken.user.username);
      this.storeAuthInfo(authToken,decodedToken.user.username);
      this.hideLoginPopup();
    })
    .catch(() => alert('incorrect username or password'))
  }

  storeAuthInfo(authToken,username) {
    localStorage.setItem('authToken',authToken);
    localStorage.setItem('currentUser',username);
  }

  logOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.setAuthToken(null);
    this.changeCurrentUser(null)
  }

  render() {
    const currentUser = this.props.currentUser;
    const authToken = this.props.authToken;
    return (
      <div className="top-bar">
          <span className="top-bar-logo">MixerHub 2.0</span>
          {authToken ?
            <span>
            <button className="top-bar-signout" href="#" onClick={this.logOut.bind(this)}>Log Out</button>
            <span className="top-bar-welcome">Welcome, {currentUser}!</span>
            </span> :
            <button className="top-bar-signin" onClick={this.showLoginPopup.bind(this)}>Log In</button>}
            {this.props.showLogin ?
              <LoginForm
                onSubmitLogin={values => this.getAuthToken(values)} 
                closePopup={this.hideLoginPopup.bind(this)} /> :
                null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.main.currentUser,
  authToken: state.main.authToken,
  showLogin: state.main.showLogin
});

export default connect(mapStateToProps)(App);