import React, { Component } from 'react';
import {connect} from 'react-redux';

import './abvcalc-ing-list.css';

import {deleteIngredient} from '../../actions/abvcalc';

export class ABVCalcIngredientsList extends Component {

  deleteIngredient(index) {
    this.props.dispatch(deleteIngredient(index));
  }

  render() {
    return (
      <div className="row">

       {this.props.ingredients.map((ingredient,index) => {
        let ingredientABV = parseFloat(ingredient.abv).toFixed(2);
        let parts = parseFloat(ingredient.parts).toFixed(2);
        return <div key={index}>
                <button className="abvcalc-ing-list-delete-button"
                  onClick={this.deleteIngredient.bind(this,{index})}>X</button>
                <span>{index+1}. ABV: {ingredientABV}% Parts: {parts}</span>
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