import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  changeCurrentUser,
  setAuthToken
} from './actions';

import './App.css';

class App extends Component {
  changeCurrentUser(user) {
    this.props.dispatch(changeCurrentUser(user));
  }

  setAuthToken(authToken) {
    this.props.dispatch(setAuthToken(authToken));
  }

  render() {
    const currentUser = this.props.currentUser;
    const authToken = this.props.authToken;
    return (
      <div className="App">
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.main.currentUser,
  authToken: state.main.authToken
});

export default connect(mapStateToProps)(App);