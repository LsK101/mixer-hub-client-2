import * as actions from '../actions/abvcalc';

const initialState = {
  simpleMode: true,
	showNewIngredientPopup: false,
  showNewIngredientPopupExact: false,
  addIngredientLoading: false,
  ingredients: []
}

export const abvCalcReducer = (state=initialState, action) => {
  if (action.type === actions.SET_NEW_INGREDIENT_POPUP) {
    return Object.assign({}, state, {
      showNewIngredientPopup: action.boolean
    });
  }
  else if (action.type === actions.SET_NEW_INGREDIENT_POPUP_EXACT) {
    return Object.assign({}, state, {
      showNewIngredientPopupExact: action.boolean
    });
  }
  else if (action.type === actions.SET_NEW_INGREDIENT_POPUP_LOADING) {
    return Object.assign({}, state, {
      addIngredientLoading: action.boolean
    });
  }
  else if (action.type === actions.ADD_NEW_INGREDIENT) {
    return Object.assign({}, state, {
      ingredients: [...state.ingredients, action.newIngredient]
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
  else if (action.type === actions.TOGGLE_SIMPLE_MODE) {
    return Object.assign({}, state, {
      simpleMode: action.boolean,
      ingredients: []
    });
  }
	return state;
}