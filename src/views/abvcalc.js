import React, { Component } from 'react';
import {connect} from 'react-redux';

import './abvcalc.css';

export class ABVCalc extends Component {

  render() {
    return (
      <div className="row">
      	<h1>ABV Calculator</h1>
        <h2>Ingredients</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(ABVCalc);