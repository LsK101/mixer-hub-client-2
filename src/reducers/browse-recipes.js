import * as actions from '../actions/browse-recipes';

const initialState = {
	loading: false,
  sort: 'Recipe Name A-Z',
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
  else if (action.type === actions.CHANGE_SORT_METHOD) {
    return Object.assign({}, state, {
      sort: action.sortMethod
    });
  }
	return state;
}