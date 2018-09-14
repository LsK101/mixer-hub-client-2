import * as actions from '../actions/manage-recipes';

const initialState = {
	loading: false,
  searchInput: '',
  searchQuery: '',
  sort: 'Recipe Name A-Z',
  recipeData: []
}

export const manageRecipesReducer = (state=initialState, action) => {
  if (action.type === actions.SET_RECIPE_DATA) {
    return Object.assign({}, state, {
      recipeData: action.recipeData
    });
  }
  else if (action.type === actions.SET_MANAGE_LOADING) {
  	return Object.assign({}, state, {
  		loading: action.boolean
  	});
  }
  else if (action.type === actions.CHANGE_SEARCH_INPUT) {
    return Object.assign({}, state, {
      searchInput: action.searchInput
    });
  }
  else if (action.type === actions.CHANGE_SEARCH_QUERY) {
    return Object.assign({}, state, {
      searchQuery: action.searchQuery
    });
  }
  else if (action.type === actions.CHANGE_SORT_METHOD) {
    return Object.assign({}, state, {
      sort: action.sortMethod
    });
  }
	return state;
}