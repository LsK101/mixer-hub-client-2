import React, { Component } from 'react';

import './home.css';
import CalculateGraphic from '../images/calculate-graphic.png';
import CreateGraphic from '../images/create-graphic.png';
import CritiqueGraphic from '../images/critique-graphic.png';
import DiscoverGraphic from '../images/discover-graphic.png';

export default class Home extends Component {
  render() {
    return (
      <div>

      <div className="row">
        <div className="col-12 home-header-text">
          <h1>Welcome to MixerHub 2.</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <img className="homepage-graphic" src={CreateGraphic} alt="cocktail shaker glass and liquor bottle"/>
        </div>
        <div className="col-6 home-section-text">
          <h2>Create</h2>
          <p>
            Share your favorite drink recipes
            and experiment to make new ones.   
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <img className="homepage-graphic" src={CalculateGraphic} alt="liquor bottles and a calculator"/>
        </div>
        <div className="col-6 home-section-text">
          <h2>Calculate</h2>
          <p>
            Fine tune your cocktail's ABV to
            get that perfect balance of taste
            and buzz.    
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <img className="homepage-graphic" src={DiscoverGraphic} alt="magnifying glass and cocktail glass"/>
        </div>
        <div className="col-6 home-section-text">
          <h2>Discover</h2>
          <p>
            Discover recipes made by others. Be
            adventurous and try something new!    
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <img className="homepage-graphic" src={CritiqueGraphic} alt="a thumbs up rating stars and a cocktail glass"/>
        </div>
        <div className="col-6 home-section-text">
          <h2>Critique</h2>
          <p>
            Give feedback on other's recipes and
            receive feedback on your own.  
          </p>
        </div>
      </div>

      </div>
    );
  }
}