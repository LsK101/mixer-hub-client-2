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
        toggleSimpleMode} from '../actions/abvcalc.js'

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
    this.props.dispatch(setNewIngredientPopup(false));
    this.props.dispatch(setNewIngredientPopupExact(false));
    this.props.dispatch(setNewIngredientPopupLoading(false));
  }

  clearIngredients() {
    this.props.dispatch(clearIngredients());
  }

  toggleSimpleMode(boolean) {
    this.props.dispatch(toggleSimpleMode(boolean));
  }

  render() {
    let ingredients = this.props.ingredients;
    let totalAlcohol = 0;
    let totalParts = 0;
    let ABV;
    if (ingredients.length > 0) {
      for (let i = 0; i < ingredients.length; i++) {
        totalAlcohol += parseFloat(ingredients[i].abv) * parseFloat(ingredients[i].parts);
        totalParts += parseFloat(ingredients[i].parts);
      }
      ABV = (totalAlcohol / totalParts).toFixed(2);
    }
    let totalPartsmL = (totalParts).toFixed(2);
    let totalPartsL = (totalParts / 1000).toFixed(2);
    let totalPartsfloz = (totalParts / 29.5735).toFixed(2);
    let totalPartsshot = (totalParts / 44.3603).toFixed(2);
    let totalPartscup = (totalParts / 236.588).toFixed(2);
    let totalPartspt = (totalParts / 473.176).toFixed(2);
    let totalPartsqt = (totalParts / 946.353).toFixed(2);
    let totalPartsgal = (totalParts / 3785.41).toFixed(2);
    return (
      <div className="row">
        <h1>ABV Calculator</h1>
        {this.props.simpleMode ? // CONDITIONAL: PARTS MEASUREMENT MODE BEGINS HERE
          <div>
            {this.props.showNewIngredientPopup ? // CONDITIONAL: INGREDIENT POPUP IF STATEMENT
              <ABVCalcIngredientForm 
                loading={this.props.addIngredientLoading}
                addIngredient={values => this.addIngredient(values)} 
                closePopup={this.hideIngredientPopup.bind(this)} /> :
              null }
            <span>Parts Measurements:</span>
            <br/>
            <span>Ingredients measured by parts.</span>
            <br/>
            <button className="abvcalc-switch-button" onClick={this.toggleSimpleMode.bind(this,false)}>
              Switch To Exact Measurements
            </button>
            <br/><br/>
            {this.props.ingredients.length === 0 ?
              <span>Mixture ABV: N/A</span> :
              <span>Mixture ABV: {ABV}%</span> }
            <br/>
            <button className="abvcalc-add-ing-button" onClick={this.showIngredientPopup.bind(this)}>
              Add Ingredient
            </button>
            <button className="abvcalc-clear-ing-button" onClick={this.clearIngredients.bind(this)}>
              Clear
            </button>
            <br/>
            <ABVCalcIngredientsList />
          </div> : // CONDITIONAL: EXACT MEASUREMENT MODE BEGINS HERE
          <div>
            {this.props.showNewIngredientPopupExact ? // CONDITIONAL: INGREDIENT EXACT POPUP IF STATEMENT
              <ABVCalcIngredientFormExact  
                loading={this.props.addIngredientLoading}
                addIngredient={values => this.addIngredient(values)} 
                closePopup={this.hideIngredientPopupExact.bind(this)} /> :
              null }
            <span>Exact Measurements:</span>
            <br/>
            <span>Ingredients measured by mL, fl oz, etc.</span>
            <br/>
            <button className="abvcalc-switch-button" onClick={this.toggleSimpleMode.bind(this,true)}>
              Switch To Parts Measurements
            </button>
            <br/><br/>
            {this.props.ingredients.length === 0 ?
              <div>
                <span>Mixture ABV: N/A</span>
                <br/><br/>
                <span>Total Volume (All Units):</span>
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
                <span>Mixture ABV: {ABV}%</span>
                <br/><br/>
                <span>Total Volume (All Units):</span>
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
            <br/>
            <button className="abvcalc-add-ing-button" onClick={this.showIngredientPopupExact.bind(this)}>
              Add Ingredient
            </button>
            <button className="abvcalc-clear-ing-button" onClick={this.clearIngredients.bind(this)}>
              Clear
            </button>
            <br/>
            <ABVCalcIngredientsListExact />
          </div> }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  simpleMode: state.abvcalc.simpleMode,
  showNewIngredientPopup: state.abvcalc.showNewIngredientPopup,
  showNewIngredientPopupExact: state.abvcalc.showNewIngredientPopupExact,
  addIngredientLoading: state.abvcalc.addIngredientLoading,
  ingredients: state.abvcalc.ingredients
});

export default connect(mapStateToProps)(ABVCalc);