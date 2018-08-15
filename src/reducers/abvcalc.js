import * as actions from '../actions/abvcalc';

const initialState = {
  simpleMode: true,
	showNewIngredientPopup: false,
  showNewIngredientPopupExact: false,
  addIngredientLoading: false,
  ingredients: [],
  totalABV: null,
  totalParts: null,
  recipeName: ''
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
      ingredients: [],
      recipeName: ''
    });
  }
  else if (action.type === actions.TOGGLE_SIMPLE_MODE) {
    return Object.assign({}, state, {
      simpleMode: action.boolean,
      ingredients: [],
      recipeName: ''
    });
  }
  else if (action.type === actions.RECALCULATE_ABV) {
    let ingredients = state.ingredients;
    let totalAlcohol = 0;
    let totalParts = 0;
    let ABV;
    if (ingredients.length > 0) {
      for (let i = 0; i < ingredients.length; i++) {
        totalAlcohol += parseFloat(ingredients[i].abv) * parseFloat(ingredients[i].parts);
        totalParts += parseFloat(ingredients[i].parts);
      }
      ABV = (totalAlcohol / totalParts).toFixed(2);
      return Object.assign({}, state, {
        totalABV: ABV,
        totalParts: totalParts
      });
    }
    else {
      return Object.assign({}, state, {
        totalABV: null,
        totalParts: null
      });
    }
  }
  else if (action.type === actions.CHANGE_RECIPE_NAME) {
    return Object.assign({}, state, {
      recipeName: action.recipeName
    });
  }
	return state;
}