import React, { Component } from 'react';
import {connect} from 'react-redux';

import './browse-recipes.css';
import {API_BASE_URL} from '../config';

import {setRecipeData} from '../actions/browse-recipes';

export class BrowseRecipes extends Component {
  componentWillMount() {
    this.getRecipeDatabase();
  }

  getRecipeDatabase() {
    fetch(`${API_BASE_URL}/newrecipes`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return res.json();
    })
    .then(recipeData => {
      return this.props.dispatch(setRecipeData(recipeData));
    })
    .catch((err) => {
      return alert(err);
    });
  }

  render() {
    return (
      <div className="row">

        <h1>Browse Recipes</h1>

        {this.props.recipeData.map((recipe,index) => {
          let recipeName = recipe.recipeName;
          let username = recipe.username;
          let ingredients = recipe.ingredients;
          let ABV = recipe.totalABV.toFixed(2);
          let simpleMode = recipe.simpleMode;
          if (simpleMode === true) {
            return <div key={index} className="browse-recipe-container col-12">
                    <span><b>{recipeName}</b> ({ABV}% ABV)</span>
                    <br/>
                    <span>Mixed By: <i>{username}</i></span>
                    <br/><br/>
                    {ingredients.map((ingredient, index) => {
                      let ingredientABV = parseFloat(ingredient.abv).toFixed(2);
                      let ingredientParts = parseFloat(ingredient.parts).toFixed(2);
                      if (ingredientParts === parseFloat(1).toFixed(2)) {
                        return <span className="browse-recipe-ingredient" key={index}>1 part: {ingredient.ingredient} ({ingredientABV}% ABV)</span>
                      }
                      else if (ingredientParts === Math.floor(ingredientParts).toFixed(2)) {
                        return <span className="browse-recipe-ingredient" key={index}>{Math.floor(ingredientParts)} parts: {ingredient.ingredient} ({ingredientABV}% ABV)</span>
                      }
                      else {
                        return <span className="browse-recipe-ingredient" key={index}>{ingredientParts} parts: {ingredient.ingredient} ({ingredientABV}% ABV)</span>
                      }
                    })}
                  </div>
          }
          else {
            return <div key={index} className="browse-recipe-container col-12">
                    <span><b>{recipeName}</b> ({ABV}% ABV)</span>
                    <br/>
                    <span>Mixed By: <i>{username}</i></span>
                    <br/><br/>
                    {ingredients.map((ingredient, index) => {
                      let ingredientABV = parseFloat(ingredient.abv).toFixed(2);
                      let ingredientAmount = parseFloat(ingredient.amount).toFixed(2);
                      let unit;
                      if (ingredient.measurement === 'milliliters (mL)') {
                        unit = 'mL'
                      }
                      else if (ingredient.measurement === 'liters (L)') {
                        unit = 'L'
                      }
                      else if (ingredient.measurement === 'fluid ounces (fl oz)') {
                        unit = 'fl oz'
                      }
                      else if (ingredient.measurement === 'shots (1.5 fl oz each)' && ingredientAmount === parseFloat(1).toFixed(2)) {
                        unit = 'shot'
                      }
                      else if (ingredient.measurement === 'shots (1.5 fl oz each)' && ingredientAmount !== parseFloat(1).toFixed(2)) {
                        unit = 'shots'
                      }
                      else if (ingredient.measurement === 'cups (c)') {
                        unit = 'c'
                      }
                      else if (ingredient.measurement === 'pints (pt)') {
                        unit = 'pt'
                      }
                      else if (ingredient.measurement === 'quarts (qt)') {
                        unit = 'qt'
                      }
                      else if (ingredient.measurement === 'gallons (gal)') {
                        unit = 'gal'
                      }
                      if (ingredientAmount === parseFloat(1).toFixed(2)) {
                        return <span className="browse-recipe-ingredient" key={index}>1 {unit}: {ingredient.ingredient} ({ingredientABV}% ABV)</span>
                      }
                      else if (ingredientAmount === Math.floor(ingredientAmount).toFixed(2)) {
                        return <span className="browse-recipe-ingredient" key={index}>{Math.floor(ingredientAmount)} {unit}: {ingredient.ingredient} ({ingredientABV}% ABV)</span>
                      }
                      else {
                        return <span className="browse-recipe-ingredient" key={index}>{ingredient.amount} {unit}: {ingredient.ingredient} ({ingredientABV}% ABV)</span>
                      }
                    })}
                  </div>
          }
        })}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipeData: state.browseRecipes.recipeData
});

export default connect(mapStateToProps)(BrowseRecipes);