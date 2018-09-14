import React, { Component } from 'react';

import './home.css';
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
        <div className="col-4 home-section-text">
          <img className="homepage-graphic" src={CreateGraphic} alt="cocktail shaker glass and liquor bottle"/>
          <h2>Create</h2>
          <p>
            Share your favorite drink recipes
            and experiment to make new ones.   
          </p>
        </div>

        <div className="col-4 home-section-text">
          <img className="homepage-graphic" src={DiscoverGraphic} alt="magnifying glass and cocktail glass"/>
          <h2>Discover</h2>
          <p>
            Discover recipes made by others. Be
            adventurous and try something new!    
          </p>
        </div>

        <div className="col-4 home-section-text">
          <img className="homepage-graphic" src={CritiqueGraphic} alt="a thumbs up rating stars and a cocktail glass"/>
          <h2>Critique</h2>
          <p>
            Give feedback on other's recipes and
            receive feedback on your own.  
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h2>Changelog</h2>
          <ul className="changelog-ul">
            <li>[<b>08/15/2018</b>] Recipe database now browsable.</li>
            <li>[<b>08/15/2018</b>] Converted Quick ABV Calculator to Recipe Creator, merged functionality.</li>
            <li>[<b>08/12/2018</b>] Quick ABV Calculator fully functional.</li>
          </ul>
          <h2>To do list:</h2>
          <ul className="changelog-ul">
            <li>- <b>[Dashboard]</b> main functionality</li>
            <li>- <b>[Create Recipe / ABV Calculator]</b> confirmation dialog when clearing recipes or deleting ingredients</li>
            <li>- <b>[Create Recipe / ABV Calculator]</b> warning dialog that switching modes will clear recipe</li>
            <li>- <b>[Create Recipe / ABV Calculator]</b> edit individual ingredients</li>
            <li>- <b>[Create Recipe / ABV Calculator]</b> add recipe photo</li>
            <li>- <b>[Create Recipe / ABV Calculator]</b> add recipe description</li>
            <li>- <b>[Browse Recipes]</b> search and sort recipe list</li>
            <li>- <b>[Browse Recipes]</b> implement page system</li>
            <li>- <b>[Browse Recipes]</b> show minimal recipe info, click recipe to expand or open new window</li>
            <li>- <b>[Browse Recipes]</b> ratings system</li>
            <li>- <b>[Browse Recipes]</b> commenting system</li>
            <li>- <b>[Manage Recipes]</b> main functionality</li>
          </ul>
        </div>
      </div>

      </div>
    );
  }
}