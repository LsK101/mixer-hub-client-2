import React, { Component } from 'react';
import {connect} from 'react-redux';

import './abvcalc-ing-list.css';

import {deleteIngredient,
        recalculateABV} from '../../actions/abvcalc';

export class ABVCalcIngredientsListExact extends Component {

  deleteIngredient(index) {
    this.props.dispatch(deleteIngredient(index));
    this.props.dispatch(recalculateABV());
  }

  render() {
    return (
      <div className="col-12">

       {this.props.ingredients.map((ingredient,index) => {
        let ingredientABV = parseFloat(ingredient.abv).toFixed(2);
        let amount = parseFloat(ingredient.amount).toFixed(2);
        let units = ingredient.measurement;
        let ingredientName = ingredient.ingredient;
        return <div key={index} className="abvcalc-ing-list-ing col-6">
                <button className="abvcalc-ing-list-delete-button"
                  onClick={this.deleteIngredient.bind(this,{index})}>Delete</button>
                <br/>
                <span>Ingredient #{index+1}:</span>
                <ul className="abvcalc-ing-list-ul">
                <li>{ingredientName}</li>
                <li>{ingredientABV}% ABV</li>
                <li>{amount} {units}</li>
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

export default connect(mapStateToProps)(ABVCalcIngredientsListExact);