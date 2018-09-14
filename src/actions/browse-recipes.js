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