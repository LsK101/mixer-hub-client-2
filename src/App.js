import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import {changeCurrentUser,
        setAuthToken} from './actions';

import './App.css';
import {API_BASE_URL} from './config';
import DummyLogin from './views/dummy-login'

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
      this.changeCurrentUser(decodedToken.user.username)
      this.storeAuthInfo(authToken,decodedToken.user.username);
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
      <Router>
        <main>
          {authToken ?
            <button onClick={this.logOut.bind(this)}>Log Out</button> :
            <Route exact path="/" 
              render={() => (<DummyLogin
                              onSubmitLogin={values => this.getAuthToken(values)} />) } />  }
          <br/>
          <span>{currentUser ? `Logged in as ${currentUser}` : "Not Logged In"}</span>
          <br/>
          <span>Authentication Token: {authToken ? "Valid" : "None"}</span>
        </main>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.main.currentUser,
  authToken: state.main.authToken
});

export default connect(mapStateToProps)(App);