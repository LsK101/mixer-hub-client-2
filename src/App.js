import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import {changeCurrentUser,
        setAuthToken,
        showLoginPopup,
        showSignupPopup} from './actions';
import {API_BASE_URL} from './config';

import './App.css';
import HeaderBar from './views/header-bar';
import FooterBar from './views/footer-bar';
import LoginForm from './views/login-form';
import SignupForm from './views/signup-form';
import Home from './views/home';

export class App extends Component {
  componentWillMount() {
    let localToken = localStorage.getItem('authToken');
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
        const decodedToken = jwtDecode(authToken).user;
        this.setAuthToken(authToken);
        this.changeCurrentUser(decodedToken);
        this.storeAuthInfo(authToken,decodedToken.username,decodedToken.firstName);
      })
      .catch(err => {
        this.logOut();
        alert('Session expired. Please log in again.');
      });
    }
  }

  hideLoginPopup() {
    this.props.dispatch(showLoginPopup(false));
  }

  hideSignupPopup() {
    this.props.dispatch(showSignupPopup(false));
  }

  changeCurrentUser(user) {
    this.props.dispatch(changeCurrentUser(user));
  }

  setAuthToken(authToken) {
    this.props.dispatch(setAuthToken(authToken));
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
      const decodedToken = jwtDecode(authToken).user;
      this.setAuthToken(authToken);
      this.changeCurrentUser(decodedToken);
      this.storeAuthInfo(authToken,decodedToken.username,decodedToken.firstName);
      this.hideLoginPopup();
      this.hideSignupPopup();
    })
    .catch(() => alert('Incorrect username or password.'));
  }

  storeAuthInfo(authToken,username,firstName) {
    localStorage.setItem('authToken',authToken);
    localStorage.setItem('currentUser',username);
    localStorage.setItem('currentFirstName',firstName)
  }

  logOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentFirstName');
    this.setAuthToken(null);
    this.changeCurrentUser(null);
  }

  sendSignupCredentials(values) {
    let firstName = values.firstname;
    let username = values.username.toLowerCase();
    let password = values.password;
    let passwordConfirm = values.confirm;
    if (!firstName) {
      return alert('First name is required.')
    }
    if (password !== passwordConfirm) {
      return alert('Passwords do not match.')
    }
    if (username.length < 3 || username.length > 25) {
      return alert('Username must be between 3 and 25 characters')
    }
    if (password.length < 10 || password.length > 72) {
      return alert('Password must be between 10 and 72 characters')
    }
    if (firstName !== firstName.trim() ||
        username !== username.trim() || 
        password !== password.trim()) {
      return alert('Inputs cannot begin or end with whitespace')
    }
    fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "firstName": firstName,
        "username": username,
        "password": password
      })
    })
    .then(res => {
      if (!res.ok) {
        throw Error('Username already taken');
      }
      return res;
    })
    .then(() => {
      this.getAuthToken(values);
    })
    .catch(err => {
      return alert('Username already taken');
    });
  }

  render() {
    return (
      <Router>
        <main>
          <Route path="/" component={HeaderBar} />
          {this.props.showLogin ?
              <LoginForm
                onSubmitLogin={values => this.getAuthToken(values)} 
                closeLoginPopup={this.hideLoginPopup.bind(this)} /> :
                null}
          {this.props.showSignup ?
              <SignupForm
                onSubmitSignup={values => this.sendSignupCredentials(values)} 
                closeSignupPopup={this.hideSignupPopup.bind(this)} /> :
                null}
          <Route path="/" component={FooterBar} />

          <Route exact path="/" component={Home} />
        </main>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  showLogin: state.main.showLogin,
  showSignup: state.main.showSignup
});

export default connect(mapStateToProps)(App);