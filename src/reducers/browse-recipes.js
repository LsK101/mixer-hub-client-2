import * as actions from '../actions/browse-recipes';

const initialState = {
	loading: false,
  recipeData: []
}

export const browseRecipesReducer = (state=initialState, action) => {
  if (action.type === actions.SET_RECIPE_DATA) {
    return Object.assign({}, state, {
      recipeData: action.recipeData
    });
  }
  else if (action.type === actions.SET_BROWSE_LOADING) {
  	return Object.assign({}, state, {
  		loading: action.boolean
  	});
  }
	return state;
}