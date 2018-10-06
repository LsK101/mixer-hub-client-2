export const SET_RECIPE_DATA = 'SET_RECIPE_DATA';
export const setRecipeData = recipeData => ({
	type: 'SET_RECIPE_DATA',
	recipeData
});

export const SET_MANAGE_LOADING = 'SET_MANAGE_LOADING';
export const setManageLoading = boolean => ({
	type: 'SET_MANAGE_LOADING',
	boolean
});

export const SET_DELETE_LOADING = 'SET_DELETE_LOADING';
export const setDeleteLoading = boolean => ({
	type: 'SET_DELETE_LOADING',
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

export const CHANGE_RECIPE_TO_DELETE = 'CHANGE_RECIPE_TO_DELETE';
export const changeRecipeToDelete = recipe => ({
	type: 'CHANGE_RECIPE_TO_DELETE',
	recipe
});

export const SET_CONFIRM_DELETE_POPUP = 'SET_CONFIRM_DELETE_POPUP';
export const setConfirmDeletePopup = boolean => ({
	type: 'SET_CONFIRM_DELETE_POPUP',
	boolean
});