import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import './App.css';
import HeaderBar from './views/header-bar';
import FooterBar from './views/footer-bar';

export default class App extends Component {
  render() {
    return (
      <Router>
        <main>
          <Route path="/" component={HeaderBar} />
          <Route path="/" component={FooterBar} />
        </main>
      </Router>
    );
  }
}