import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import './App.css';
import HeaderBar from './views/header-bar';
import FooterBar from './views/footer-bar';
import Home from './views/home';

export default class App extends Component {
  render() {
    return (
      <Router>
        <main>
          <Route path="/" component={HeaderBar} />
          <Route path="/" component={FooterBar} />

          <Route exact path="/" component={Home} />
        </main>
      </Router>
    );
  }
}