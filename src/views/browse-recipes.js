import React, { Component } from 'react';
import {connect} from 'react-redux';

import './browse-recipes.css';
import {API_BASE_URL} from '../config';
import LoadingGif from '../images/loading.gif';

import {setRecipeData,
        setBrowseLoading,
        changeSearchInput,
        changeSearchQuery,
        changeSortMethod} from '../actions/browse-recipes';

export class BrowseRecipes extends Component {
  componentWillMount() {
    this.getRecipeDatabase();
  }

  getRecipeDatabase() {
    this.props.dispatch(setBrowseLoading(true));
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
      this.props.dispatch(setRecipeData(recipeData));
      return this.props.dispatch(setBrowseLoading(false));
    })
    .catch((err) => {
      this.props.dispatch(setBrowseLoading(false));
      return alert(err);
    });
  }

  changeSearchInput(event) {
    this.props.dispatch(changeSearchInput(event.target.value));
  }

  changeSearchQuery() {
    this.getRecipeDatabase();
    this.props.dispatch(changeSearchQuery(this.props.searchInput));
    this.props.dispatch(changeSearchInput(''));
  }

  clearSearchFilters() {
    this.getRecipeDatabase();
    this.props.dispatch(changeSearchQuery(''));
    this.props.dispatch(changeSearchInput(''));
  }

  filterRecipesBySearchQuery(recipeName, ingredients, recipeCreator) {
    const queryStrings = this.props.searchQuery.toLowerCase().split(" ").filter(Boolean);
    const recipeNameLowercased = recipeName.toLowerCase();
    const recipeCreatorLowercased = recipeCreator.toLowerCase();
    let recipeTotalString = recipeNameLowercased + " " + recipeCreatorLowercased + " ";
    for (let i = 0; i < ingredients.length; i++) {
      recipeTotalString += ingredients[i].ingredient.toLowerCase();
      recipeTotalString += " ";
    }
    for (let j = 0; j < queryStrings.length; j++) {
      if (!recipeTotalString.includes(queryStrings[j])) {
        return false;
      }
    }
    return true;
  }

  changeSortMethod(event) {
    this.getRecipeDatabase();
    this.props.dispatch(changeSortMethod(event.target.value));
  }

  render() {
    return (
      <div className="row">

        <h1>Browse Recipes</h1>

        <form onSubmit={event => {
            event.preventDefault();
            this.changeSearchQuery();
          }}>
          <label htmlFor="browse-search-input" className="search-label"><strong>Keyword Search: </strong></label>
          <br/>
          <input type="search" id="browse-search-input" name="browse-search-input" value={this.props.searchInput} autoComplete="off"
            onChange={this.changeSearchInput.bind(this)} />
          <button className="search-button" type="submit">Search</button>
        </form>

        <br/>

        <strong>Sort By: </strong>
        <select className="sort-dropbox"
          onChange={this.changeSortMethod.bind(this)} 
          value={this.props.sort}>
          <option value='Recipe Name A-Z'>Recipe Name A-Z</option>
          <option value='Recipe Name Z-A'>Recipe Name Z-A</option>
          <option value='Recipe Mixer A-Z'>Recipe Mixer A-Z</option>
          <option value='Recipe Mixer Z-A'>Recipe Mixer Z-A</option>
          <option value='Highest ABV'>Highest ABV</option>
          <option value='Lowest ABV'>Lowest ABV</option>
          <option value='Most Ingredients'>Most Ingredients</option>
          <option value='Least Ingredients'>Least Ingredients</option>
        </select>

        <br/><br/>

        <button className="clear-button" type="button"
            onClick={this.clearSearchFilters.bind(this)}>Show All Recipes</button>

        {this.props.browseLoading 
          ? 
          <img className="browse-loading" src={LoadingGif} alt="loading" /> 
          :
          <div>
            {this.props.recipeData.filter(recipe => this.filterRecipesBySearchQuery(recipe.recipeName, recipe.ingredients, recipe.username))
              .sort((a,b) => {
              if (this.props.sort === 'Recipe Name A-Z') {
                return (a.recipeName.toLowerCase() > b.recipeName.toLowerCase() ? 1 : -1);
              }
              else if (this.props.sort === 'Recipe Name Z-A') {
                return (a.recipeName.toLowerCase() < b.recipeName.toLowerCase() ? 1 : -1);
              }
              else if (this.props.sort === 'Recipe Mixer A-Z') {
                return (a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1);
              }
              else if (this.props.sort === 'Recipe Mixer Z-A') {
                return (a.username.toLowerCase() < b.username.toLowerCase() ? 1 : -1);
              }
              else if (this.props.sort === 'Highest ABV') {
                return (a.totalABV < b.totalABV ? 1 : -1)
              }
              else if (this.props.sort === 'Lowest ABV') {
                return (a.totalABV > b.totalABV ? 1 : -1)
              }
              else if (this.props.sort === 'Most Ingredients') {
                return (a.ingredients.length < b.ingredients.length ? 1 : -1)
              }
              else if (this.props.sort === 'Least Ingredients') {
                return (a.ingredients.length > b.ingredients.length ? 1 : -1)
              }
              else {
                return 0;
              }
              })
              .map((recipe,index) => {
              let recipeName = recipe.recipeName;
              let username = recipe.username;
              let ingredients = recipe.ingredients;
              let ABV = recipe.totalABV.toFixed(2);
              let simpleMode = recipe.simpleMode;
              if (simpleMode === true) {
                return <div key={index} className="browse-recipe-container col-12">
                        <span><b>{recipeName}</b></span>
                        <br/> 
                        <span>{ABV}% ABV</span>
                        <br/>
                        <span>Mixed By: <i>{username}</i></span>
                        <br/><br/>
                        {ingredients.sort((a,b) => {
                            return (a.parts < b.parts ? 1 : -1);
                          })
                          .map((ingredient, index) => {
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
                        <span><b>{recipeName}</b></span>
                        <br/> 
                        <span>{ABV}% ABV</span>
                        <br/>
                        <span>Mixed By: <i>{username}</i></span>
                        <br/><br/>
                        {ingredients.sort((a,b) => {
                            return (a.parts < b.parts ? 1 : -1);
                          })
                          .map((ingredient, index) => {
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
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sort: state.browseRecipes.sort,
  searchInput: state.browseRecipes.searchInput,
  searchQuery: state.browseRecipes.searchQuery,
  browseLoading: state.browseRecipes.loading,
  recipeData: state.browseRecipes.recipeData
});

export default connect(mapStateToProps)(BrowseRecipes);