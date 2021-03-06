export const SET_RECIPE_DATA = 'SET_RECIPE_DATA';
export const setRecipeData = recipeData => ({
	type: 'SET_RECIPE_DATA',
	recipeData
});

export const SET_BROWSE_LOADING = 'SET_BROWSE_LOADING';
export const setBrowseLoading = boolean => ({
	type: 'SET_BROWSE_LOADING',
	boolean
});

export const CHANGE_SEARCH_INPUT = 'CHANGE_SEARCH_INPUT';
export const changeSearchInput = searchInput => ({
	type: 'CHANGE_SEARCH_INPUT',
	searchInput
});

export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export const changeSearchQuery = searchQuery => ({
	type: 'CHANGE_SEARCH_QUERY',
	searchQuery
});

export const CHANGE_SORT_METHOD = 'CHANGE_SORT_METHOD';
export const changeSortMethod = sortMethod => ({
	type: 'CHANGE_SORT_METHOD',
	sortMethod
});