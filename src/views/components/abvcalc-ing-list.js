import React, { Component } from 'react';
import {connect} from 'react-redux';

import './abvcalc-ing-list.css';

import {deleteIngredient,
        recalculateABV} from '../../actions/abvcalc';

export class ABVCalcIngredientsList extends Component {

  deleteIngredient(index) {
    this.props.dispatch(deleteIngredient(index));
    this.props.dispatch(recalculateABV());
  }

  render() {
    return (
      <div>

       {this.props.ingredients.map((ingredient,index) => {
        let ingredientABV = parseFloat(ingredient.abv).toFixed(2);
        let parts = parseFloat(ingredient.parts).toFixed(2);
        let ingredientName = ingredient.ingredient;
        return <div key={index} className="abvcalc-ing-list-ing col-6">
                <button className="abvcalc-ing-list-delete-button"
                  onClick={this.deleteIngredient.bind(this,{index})}>X</button>
                <span>Ingredient #{index+1}:</span>
                <ul className="abvcalc-ing-list-ul">
                <li>{ingredientName}</li>
                <li>{ingredientABV}% ABV</li>
                <li>{parts} Parts</li>
                </ul>
              </div>
       })}

      </div>
    );
  }
}

const mapStateToProps = state => ({
	ingredients: state.abvcalc.ingredients,
});

export default connect(mapStateToProps)(ABVCalcIngredientsList);