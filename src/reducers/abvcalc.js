import * as actions from '../actions/abvcalc';

const initialState = {
	showNewIngredientPopup: false,
  addIngredientLoading: false,
  ingredients: []
}

export const abvCalcReducer = (state=initialState, action) => {
  if (action.type === actions.SET_NEW_INGREDIENT_POPUP) {
    return Object.assign({}, state, {
      showNewIngredientPopup: action.boolean
    });
  }
  else if (action.type === actions.SET_NEW_INGREDIENT_POPUP_LOADING) {
    return Object.assign({}, state, {
      addIngredientLoading: action.boolean
    });
  }
  else if (action.type === actions.ADD_NEW_INGREDIENT) {
    return Object.assign({}, state, {
      ingredients: [...state.ingredients, {ingredient: action.newIngredient.ingredient, abv: parseFloat(action.newIngredient.abv), parts: parseFloat(action.newIngredient.parts)}]
    });
  }
  else if (action.type === actions.DELETE_INGREDIENT) {
    return Object.assign({}, state, {
      ingredients: [...state.ingredients.slice(0,action.index.index),...state.ingredients.slice(action.index.index + 1)]
    });
  }
  else if (action.type === actions.CLEAR_INGREDIENTS) {
    return Object.assign({}, state, {
      ingredients: []
    });
  }
	return state;
}