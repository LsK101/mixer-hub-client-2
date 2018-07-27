import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {toggleNavbar} from '../actions';

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
        	<img className="hamburger-icon" src={NavigationIcon} />
        	<ul className="footer-navbar-list">
          		<li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>
          		<li><Link to="/browse" className="navbar-link">Browse Recipe Database</Link></li>
          		<li><Link to="/create" className="navbar-link">Create New Recipe</Link></li>
          		<li><Link to="/manage" className="navbar-link">Manage Recipes</Link></li>
          		<li><Link to="/abvcalc" className="navbar-link">Quick ABV Calculator</Link></li>
        	</ul>
      	</div>
    );
  }
}

const mapStateToProps = state => ({
	showNavbar: state.main.showNavbar
});

export default connect(mapStateToProps)(FooterBar);