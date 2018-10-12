import React, { Component } from 'react';
import {connect} from 'react-redux';

import './abvcalc-ing-list.css';
import ABVCalcIngredientForm from './abvcalc-ing-form';

import {editIngredient,
        deleteIngredient,
        setEditIngredientPopup,
        setEditIngredientIndex,
        setNewIngredientPopupLoading,
        recalculateABV} from '../../actions/abvcalc';

export class ABVCalcIngredientsList extends Component {

  showEditIngredientPopup(index) {
    this.props.dispatch(setEditIngredientIndex(index));
    this.props.dispatch(setEditIngredientPopup(true));
  }

  hideEditIngredientPopup() {
    this.props.dispatch(setEditIngredientPopup(false));
  }

  deleteIngredient(index) {
    this.props.dispatch(deleteIngredient(index));
    this.props.dispatch(recalculateABV());
  }

  editIngredient(values) {
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
    this.props.dispatch(editIngredient(ingredient,this.props.editIndex));
    this.props.dispatch(recalculateABV());
    this.props.dispatch(setEditIngredientPopup(false));
    this.props.dispatch(setNewIngredientPopupLoading(false));
  }

  render() {
    return (
      <div className="col-12">
      {this.props.simpleMode ? // CONDITIONAL: CHECK MEASUREMENT MODE 
        // CONDITIONAL: PARTS MEASUREMENT INGREDIENT LIST BEGINS HERE
        <div>
          {this.props.ingredients.map((ingredient,index) => {
            let ingredientABV = parseFloat(ingredient.abv).toFixed(2);
            let parts = parseFloat(ingredient.parts).toFixed(2);
            let ingredientName = ingredient.ingredient;
            return <div key={index} className="abvcalc-ing-list-ing col-6">
                    <button className="abvcalc-ing-list-delete-button"
                      onClick={this.deleteIngredient.bind(this,{index})}>Delete</button>
                    <button className="abvcalc-ing-list-edit-button"
                      onClick={this.showEditIngredientPopup.bind(this,{index})}>Edit</button>
                    <br/>
                    <span>Ingredient #{index+1}:</span>
                    <ul className="abvcalc-ing-list-ul">
                    <li>{ingredientName}</li>
                    <li>{ingredientABV}% ABV</li>
                    <li>{parts} Parts</li>
                    </ul>
                    {this.props.showEditIngredientPopup ? // CONDITIONAL: INGREDIENT POPUP IF STATEMENT
                      <ABVCalcIngredientForm
                        toEdit={ingredient}
                        addEdit="Edit"
                        simpleMode={this.props.simpleMode} 
                        loading={this.props.addIngredientLoading}
                        addIngredient={values => this.editIngredient(values)}
                        closePopup={this.hideEditIngredientPopup.bind(this)} /> :
                        null}
                  </div>
          })}
        </div>
        : //CONDITIONAL: EXACT MEASUREMENT INGREDIENT LIST BEGINS HERE
        <div>
          {this.props.ingredients.map((ingredient,index) => {
            let ingredientABV = parseFloat(ingredient.abv).toFixed(2);
            let amount = parseFloat(ingredient.amount).toFixed(2);
            let units = ingredient.measurement;
            let ingredientName = ingredient.ingredient;
            return <div key={index} className="abvcalc-ing-list-ing col-6">
                    <button className="abvcalc-ing-list-delete-button"
                      onClick={this.deleteIngredient.bind(this,{index})}>Delete</button>
                    <button className="abvcalc-ing-list-edit-button"
                      onClick={this.showEditIngredientPopup.bind(this,{index})}>Edit</button>
                    <br/>
                    <span>Ingredient #{index+1}:</span>
                    <ul className="abvcalc-ing-list-ul">
                    <li>{ingredientName}</li>
                    <li>{ingredientABV}% ABV</li>
                    <li>{amount} {units}</li>
                    </ul>
                    {this.props.showEditIngredientPopup ? // CONDITIONAL: INGREDIENT POPUP IF STATEMENT
                      <ABVCalcIngredientForm
                        toEdit={ingredient}
                        addEdit="Edit"
                        simpleMode={this.props.simpleMode} 
                        loading={this.props.addIngredientLoading}
                        addIngredient={values => this.editIngredient(values)}
                        closePopup={this.hideEditIngredientPopup.bind(this)} /> :
                        null}
                  </div>
          })}
        </div>
      }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  simpleMode: state.abvcalc.simpleMode,
  editIndex: state.abvcalc.editIndex,
  showEditIngredientPopup: state.abvcalc.showEditIngredientPopup,
  addIngredientLoading: state.abvcalc.addIngredientLoading,
	ingredients: state.abvcalc.ingredients
});

export default connect(mapStateToProps)(ABVCalcIngredientsList);