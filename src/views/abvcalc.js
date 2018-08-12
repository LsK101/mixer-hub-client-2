import React, { Component } from 'react';
import {connect} from 'react-redux';

import './abvcalc.css';
import ABVCalcIngredientsList from './components/abvcalc-ing-list';
import ABVCalcIngredientForm from './components/abvcalc-ing-form';

import {setNewIngredientPopup,
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

  addIngredient(values) {
    this.props.dispatch(setNewIngredientPopupLoading(true));
    this.props.dispatch(addNewIngredient(values));
    this.props.dispatch(setNewIngredientPopup(false));
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
        totalAlcohol += ingredients[i].abv * ingredients[i].parts;
        totalParts += ingredients[i].parts;
      }
      ABV = (totalAlcohol / totalParts).toFixed(2);
    }
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
            <button className="abvcalc-switch-button" onClick={this.toggleSimpleMode.bind(this,false)}>
              Switch To Exact Measurements
            </button>
            <br/><br/>
            {this.props.ingredients.length === 0 ?
              <b>Mixture ABV: N/A</b> :
              <b>Mixture ABV: {ABV}%</b> }
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
            <span>Exact Measurements:</span>
            <br/>
            <span>Ingredients measured by mL, fl oz, etc.</span>
            <br/>
            <span>(Coming soon!)</span>
            <button className="abvcalc-switch-button" onClick={this.toggleSimpleMode.bind(this,true)}>
              Switch To Parts Measurements
            </button>
          </div> }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  simpleMode: state.abvcalc.simpleMode,
  showNewIngredientPopup: state.abvcalc.showNewIngredientPopup,
  addIngredientLoading: state.abvcalc.addIngredientLoading,
  ingredients: state.abvcalc.ingredients
});

export default connect(mapStateToProps)(ABVCalc);