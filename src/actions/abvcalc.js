export const SET_NEW_INGREDIENT_POPUP = 'SET_NEW_INGREDIENT_POPUP';
export const setNewIngredientPopup = boolean => ({
	type: 'SET_NEW_INGREDIENT_POPUP',
	boolean
});

export const SET_NEW_INGREDIENT_POPUP_LOADING = 'SET_NEW_INGREDIENT_POPUP_LOADING';
export const setNewIngredientPopupLoading = boolean => ({
	type: 'SET_NEW_INGREDIENT_POPUP_LOADING',
	boolean
});

export const ADD_NEW_INGREDIENT = 'ADD_NEW_INGREDIENT';
export const addNewIngredient = newIngredient => ({
	type: 'ADD_NEW_INGREDIENT',
	newIngredient
});

export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const deleteIngredient = index => ({
	type: 'DELETE_INGREDIENT',
	index
});