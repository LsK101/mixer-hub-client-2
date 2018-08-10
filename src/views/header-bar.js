import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {changeCurrentUser,
        setAuthToken,
        showLoginPopup,
        showSignupPopup} from '../actions';

import './header-bar.css';
import LoadingGif from '../images/loading.gif';
import BannerLogo from '../images/logo-banner-trans.png';

export class HeaderBar extends Component {

  changeCurrentUser(user) {
    this.props.dispatch(changeCurrentUser(user));
  }

  setAuthToken(authToken) {
    this.props.dispatch(setAuthToken(authToken));
  }

  showLoginPopup() {
    this.props.dispatch(showLoginPopup(true));
  }

  showSignupPopup() {
    this.props.dispatch(showSignupPopup(true));
  }

  logOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentFirstName');
    this.setAuthToken(null);
    this.changeCurrentUser(null);
  }

  render() {
    const currentFirstName = this.props.currentFirstName;
    const authToken = this.props.authToken;
    return (
      <div className="top-bar">
          <Link to="/" className="navbar-link"><img src={BannerLogo} className="banner-logo" alt="mixer hub logo"/></Link>
          {authToken ?
            <span>
            <button className="top-bar-signout" href="#" onClick={this.logOut.bind(this)}>Log Out</button>
            <span className="top-bar-welcome">Welcome, {currentFirstName}!</span>
            </span> :
            <span>
              {this.props.loginLoading ? 
                <img className="top-bar-loading" src={LoadingGif} alt="loading" /> :
                <span>
                <button className="top-bar-signup" onClick={this.showSignupPopup.bind(this)}>Sign Up</button>
                <button className="top-bar-signin" onClick={this.showLoginPopup.bind(this)}>Log In</button> 
                </span> }
            </span> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.main.currentUser,
  currentFirstName: state.main.currentFirstName,
  authToken: state.main.authToken,
  loginLoading: state.main.loginLoading
});

export default connect(mapStateToProps)(HeaderBar);