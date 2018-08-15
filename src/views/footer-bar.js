import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {toggleNavbar} from '../actions/auth';

import './footer-bar.css';
import NavigationIcon from '../images/hamburger-with-text.png';

export class FooterBar extends Component {

	toggleNavbar() {
		this.props.dispatch(toggleNavbar(this.props.showNavbar));
	}

  	render() {
  		const showNavbar = this.props.showNavbar;
    	return (
    	<div id="footer-navbar" 
    		className={showNavbar ? 'slide-out' : 'slide-in'} 
    		onClick={this.toggleNavbar.bind(this)}>
        	<img className="hamburger-icon" src={NavigationIcon} alt="navigation icon"/>
        	<ul className="footer-navbar-list">
          		<li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>
              <li><Link to="/abvcalc" className="navbar-link">Create Recipe / ABV Calculator</Link></li>
          		<li><Link to="/browse" className="navbar-link">Browse Recipe Database</Link></li>
          		<li><Link to="/manage" className="navbar-link">Manage Recipes</Link></li>
        	</ul>
      	</div>
    );
  }
}

const mapStateToProps = state => ({
	showNavbar: state.auth.showNavbar
});

export default connect(mapStateToProps)(FooterBar);