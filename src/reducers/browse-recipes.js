import * as actions from '../actions/browse-recipes';

const initialState = {
  recipeData: []
}

export const browseRecipesReducer = (state=initialState, action) => {
  if (action.type === actions.SET_RECIPE_DATA) {
    return Object.assign({}, state, {
      recipeData: action.recipeData
    });
  }
	return state;
}