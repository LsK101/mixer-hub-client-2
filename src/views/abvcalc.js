import React, { Component } from 'react';
import {connect} from 'react-redux';

import './abvcalc.css';
import ABVCalcIngredientsList from './components/abvcalc-ing-list';
import ABVCalcIngredientForm from './components/abvcalc-ing-form';

import {setNewIngredientPopup,
        setNewIngredientPopupLoading,
        addNewIngredient} from '../actions/abvcalc.js'

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
        {this.props.showNewIngredientPopup ?
          <ABVCalcIngredientForm 
            loading={this.props.addIngredientLoading}
            addIngredient={values => this.addIngredient(values)} 
            closePopup={this.hideIngredientPopup.bind(this)} /> :
          null }
        <h1>ABV Calculator</h1>
        {this.props.ingredients.length === 0 ?
          <span>ABV: (No Ingredients Added)</span> :
          <span>ABV: {ABV}%</span> }
        <button className="abvcalc-add-ing-button" onClick={this.showIngredientPopup.bind(this)}>
          Add Ingredient
        </button>
        <br/>
        <ABVCalcIngredientsList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showNewIngredientPopup: state.abvcalc.showNewIngredientPopup,
  addIngredientLoading: state.abvcalc.addIngredientLoading,
  ingredients: state.abvcalc.ingredients
});

export default connect(mapStateToProps)(ABVCalc);