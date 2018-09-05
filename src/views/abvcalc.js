import React, { Component } from 'react';
import {connect} from 'react-redux';

import './abvcalc.css';
import ABVCalcIngredientsList from './components/abvcalc-ing-list';
import ABVCalcIngredientForm from './components/abvcalc-ing-form';
import ABVCalcIngredientsListExact from './components/abvcalc-ing-list-exact';
import ABVCalcIngredientFormExact from './components/abvcalc-ing-form-exact';

import {setNewIngredientPopup,
        setNewIngredientPopupExact,
        setNewIngredientPopupLoading,
        addNewIngredient,
        clearIngredients,
        toggleSimpleMode,
        recalculateABV,
        changeRecipeName} from '../actions/abvcalc'
import {API_BASE_URL} from '../config';

export class ABVCalc extends Component {

  showIngredientPopup() {
    this.props.dispatch(setNewIngredientPopup(true));
  }

  hideIngredientPopup() {
    this.props.dispatch(setNewIngredientPopup(false));
  }

  showIngredientPopupExact() {
    this.props.dispatch(setNewIngredientPopupExact(true));
  }

  hideIngredientPopupExact() {
    this.props.dispatch(setNewIngredientPopupExact(false));
  }

  addIngredient(values) {
    let ingredient = values;
    if (ingredient.abv < 0 || ingredient.abv > 100) {
      return alert('ABV must be between 0 and 100');
    }
    if (ingredient.measurement) {
      let converted;
      if (ingredient.measurement === "milliliters (mL)") {
        converted = ingredient.amount;
      }
      else if (ingredient.measurement === "liters (L)") {
        converted = ingredient.amount * 1000;
      }
      else if (ingredient.measurement === "fluid ounces (fl oz)") {
        converted = ingredient.amount * 29.5735;
      }
      else if (ingredient.measurement === "shots (1.5 fl oz each)") {
        converted = ingredient.amount * 44.3603;
      }
      else if (ingredient.measurement === "cups (c)") {
        converted = ingredient.amount * 236.588;
      }
      else if (ingredient.measurement === "pints (pt)") {
        converted = ingredient.amount * 473.176;
      }
      else if (ingredient.measurement === "quarts (qt)") {
        converted = ingredient.amount * 946.353;
      }
      else if (ingredient.measurement === "gallons (gal)") {
        converted = ingredient.amount * 3785.41;
      }
      ingredient.parts = converted;
    }
    this.props.dispatch(setNewIngredientPopupLoading(true));
    this.props.dispatch(addNewIngredient(ingredient));
    this.props.dispatch(recalculateABV());
    this.props.dispatch(setNewIngredientPopup(false));
    this.props.dispatch(setNewIngredientPopupExact(false));
    this.props.dispatch(setNewIngredientPopupLoading(false));
  }

  clearIngredients() {
    this.props.dispatch(clearIngredients());
    this.props.dispatch(recalculateABV());
  }

  toggleSimpleMode(boolean) {
    this.props.dispatch(toggleSimpleMode(boolean));
    this.props.dispatch(recalculateABV());
  }

  changeRecipeName(recipeName) {
    this.props.dispatch(changeRecipeName(recipeName));
  }

  submitRecipe() {
    if (!this.props.authToken) {
      return alert('You must be logged in to do that.');
    }
    if (this.props.recipeName === '') {
      return alert('Recipe name required.');
    }
    if (this.props.ingredients.length < 2) {
      return alert('You must add at least 2 ingredients.');
    }
    let recipeName = this.props.recipeName;
    let ingredients = this.props.ingredients;
    let username = this.props.currentUser;
    let simpleMode = this.props.simpleMode;
    let totalABV = this.props.totalABV;
    fetch(`${API_BASE_URL}/newrecipes/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.props.authToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "recipeName": recipeName,
        "username": username,
        "ingredients": ingredients,
        "totalABV": totalABV,
        "simpleMode": simpleMode
      })
    })
    .then((res) => {
      if (res.status === 200) {
        this.clearIngredients();
        return alert('Recipe Created!')
      }
      else if (res.status === 401) {
        return alert('Authorization failed, please login again.')
      }
    })
    .catch((err) => {
      return alert(err);
    });
  }

  render() {
    let totalPartsmL = null
    let totalPartsL = null
    let totalPartsfloz = null
    let totalPartsshot = null
    let totalPartscup = null
    let totalPartspt = null
    let totalPartsqt = null
    let totalPartsgal = null
    if (this.props.totalParts !== null) {
      totalPartsmL = (this.props.totalParts).toFixed(2);
      totalPartsL = (this.props.totalParts / 1000).toFixed(2);
      totalPartsfloz = (this.props.totalParts / 29.5735).toFixed(2);
      totalPartsshot = (this.props.totalParts / 44.3603).toFixed(2);
      totalPartscup = (this.props.totalParts / 236.588).toFixed(2);
      totalPartspt = (this.props.totalParts / 473.176).toFixed(2);
      totalPartsqt = (this.props.totalParts / 946.353).toFixed(2);
      totalPartsgal = (this.props.totalParts / 3785.41).toFixed(2);
    }
    return (
      <div className="row">
        <h1>Recipe Creator</h1>
        {this.props.simpleMode ? // CONDITIONAL: PARTS MEASUREMENT MODE BEGINS HERE
          <div>
            {this.props.showNewIngredientPopup ? // CONDITIONAL: INGREDIENT POPUP IF STATEMENT
              <ABVCalcIngredientForm 
                loading={this.props.addIngredientLoading}
                addIngredient={values => this.addIngredient(values)} 
                closePopup={this.hideIngredientPopup.bind(this)} /> :
              null }
            <div className="col-6 recipe-form">
              <b>Mode: Parts Measurements</b>
              <br/>
              <span>Ingredients measured by ratio of parts.</span>
              <br/><br/>
              <button className="abvcalc-switch-button" onClick={this.toggleSimpleMode.bind(this,false)}>
                Switch To Exact Measurements
              </button>
              <br/><br/><br/>
              <input className="abvcalc-recipe-name-input" type="text" placeholder="Recipe Name" 
                value={this.props.recipeName} onChange={event => this.changeRecipeName(event.target.value)} />
              <br/><br/>
              <button className="abvcalc-add-ing-button" onClick={this.showIngredientPopup.bind(this)}>
                Add Ingredient
              </button>
              <button className="abvcalc-clear-ing-button" onClick={this.clearIngredients.bind(this)}>
                Clear Recipe
              </button>
              <br/><br/><br/>
              {!this.props.authToken || this.props.ingredients.length < 2 || this.props.recipeName === '' ?
                <button className="abvcalc-submit-button-invalid" onClick={this.submitRecipe.bind(this)}>
                Save Recipe
                </button> :
                <button className="abvcalc-submit-button" onClick={this.submitRecipe.bind(this)}>
                Save Recipe
                </button> }
            </div>
            <div className="col-6 recipe-calculation">
              {this.props.ingredients.length === 0 ?
                <span>Mixture ABV: N/A</span> :
                <span>Mixture ABV: {this.props.totalABV}%</span> }
            </div>
            <ABVCalcIngredientsList />
          </div> : // CONDITIONAL: EXACT MEASUREMENT MODE BEGINS HERE
          <div>
            {this.props.showNewIngredientPopupExact ? // CONDITIONAL: INGREDIENT EXACT POPUP IF STATEMENT
              <ABVCalcIngredientFormExact  
                loading={this.props.addIngredientLoading}
                addIngredient={values => this.addIngredient(values)} 
                closePopup={this.hideIngredientPopupExact.bind(this)} /> :
              null }
            <div className="col-6 recipe-form">
              <b>Mode: Exact Measurements</b>
              <br/>
              <span>Ingredients measured by mL, fl oz, etc.</span>
              <br/><br/>
              <button className="abvcalc-switch-button" onClick={this.toggleSimpleMode.bind(this,true)}>
                Switch To Parts Measurements
              </button>
              <br/><br/><br/>
              <input className="abvcalc-recipe-name-input" type="text" placeholder="Recipe Name" 
                value={this.props.recipeName} onChange={event => this.changeRecipeName(event.target.value)} />
              <br/><br/>
              <button className="abvcalc-add-ing-button" onClick={this.showIngredientPopupExact.bind(this)}>
                Add Ingredient
              </button>
              <button className="abvcalc-clear-ing-button" onClick={this.clearIngredients.bind(this)}>
                Clear Recipe
              </button>
              <br/><br/><br/>
              {!this.props.authToken || this.props.ingredients.length < 2 || this.props.recipeName === '' ?
                <button className="abvcalc-submit-button-invalid" onClick={this.submitRecipe.bind(this)}>
                  Save Recipe
                </button> :
                <button className="abvcalc-submit-button" onClick={this.submitRecipe.bind(this)}>
                  Save Recipe
                </button> }
            </div>
            <div className="col-6 recipe-calculation">
              {this.props.ingredients.length === 0 ?
                <div>
                  <span>Mixture ABV: N/A</span>
                  <br/><br/>
                  <span>Total Mixture Volume Conversions:</span>
                  <ul className="abvcalc-total-volume-list">
                    <li>N/A milliliters (mL)</li>
                    <li>N/A liters (L)</li>
                    <li>N/A fluid ounces (fl oz)</li>
                    <li>N/A shots (1.5 fl oz each)</li>
                    <li>N/A cups (c)</li>
                    <li>N/A pints (pt)</li>
                    <li>N/A quarts (qt)</li>
                    <li>N/A gallons (gal)</li>
                  </ul>
                </div> :
                <div>
                  <span>Mixture ABV: {this.props.totalABV}%</span>
                  <br/><br/>
                  <span>Total Mixture Volume Conversions:</span>
                  <ul className="abvcalc-total-volume-list">
                    <li>{totalPartsmL} milliliters (mL)</li>
                    <li>{totalPartsL} liters (L)</li>
                    <li>{totalPartsfloz} fluid ounces (fl oz)</li>
                    <li>{totalPartsshot} shots (1.5 fl oz each)</li>
                    <li>{totalPartscup} cups (c)</li>
                    <li>{totalPartspt} pints (pt)</li>
                    <li>{totalPartsqt} quarts (qt)</li>
                    <li>{totalPartsgal} gallons (gal)</li>
                  </ul>
                </div> }
            </div>
            <ABVCalcIngredientsListExact />
          </div> }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.authToken,
  simpleMode: state.abvcalc.simpleMode,
  showNewIngredientPopup: state.abvcalc.showNewIngredientPopup,
  showNewIngredientPopupExact: state.abvcalc.showNewIngredientPopupExact,
  addIngredientLoading: state.abvcalc.addIngredientLoading,
  ingredients: state.abvcalc.ingredients,
  currentUser: state.auth.currentUser,
  totalABV: state.abvcalc.totalABV,
  totalParts: state.abvcalc.totalParts,
  recipeName: state.abvcalc.recipeName
});

export default connect(mapStateToProps)(ABVCalc);