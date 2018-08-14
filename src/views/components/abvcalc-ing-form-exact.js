import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form'

import './abvcalc-ing-form-exact.css';
import LoadingGif from '../../images/loading.gif';

export class ABVCalcIngredientFormExact extends Component {
  render() {
    return (
      <div className="abvcalc-ing-popup">
        <div className="abvcalc-ing-exact-popup-inner">
          <form
            onSubmit={this.props.handleSubmit(values => this.props.addIngredient(values))}>
            <label className="abvcalc-ing-label" htmlFor="ingredient">Ingredient Name</label>
            <br/>
            <Field className="abvcalc-ing-name-input" 
              name="ingredient" id="ingredient" type="text" component="input" required />
            <br/>
            <label className="abvcalc-ing-label" htmlFor="abv">ABV (%)</label>
            <br/>
            <Field className="abvcalc-ing-abv-input" 
              name="abv" id="abv" type="number" component="input" step="any" required />
            <br/>
            <label className="abvcalc-ing-label" htmlFor="amount">Amount</label>
            <br/>
            <Field className="abvcalc-ing-parts-input"
              name="amount" id="amount" type="number" component="input" step="any" required />
            <br/>
            <label className="abvcalc-ing-label" htmlFor="measurement">Measurement</label>
            <br/>
            <Field className="abvcalc-ing-parts-input"
              name="measurement" id="measurement" component="select" required>
              <option></option>
              <option>milliliters (mL)</option>
              <option>liters (L)</option>
              <option>fluid ounces (fl oz)</option>
              <option>shots (1.5 fl oz each)</option>
              <option>cups (c)</option> 
              <option>pints (pt)</option>
              <option>quarts (qt)</option>
              <option>gallons (gal)</option>
            </Field>
            <br/>
            {this.props.loading ?
              <img className="abvcalc-ing-loading" src={LoadingGif} alt="loading" /> :
              <button className="abvcalc-ing-add-button" type="submit">Add Ingredient</button> }
            <button className="abvcalc-ing-cancel-button" type="button" onClick={this.props.closePopup}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'ABVCalcIngredientFormExact'
})(ABVCalcIngredientFormExact);