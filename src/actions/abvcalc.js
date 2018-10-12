export const TOGGLE_SIMPLE_MODE = 'TOGGLE_SIMPLE_MODE';
export const toggleSimpleMode = boolean => ({
	type: 'TOGGLE_SIMPLE_MODE',
	boolean
});

export const SET_NEW_INGREDIENT_POPUP = 'SET_NEW_INGREDIENT_POPUP';
export const setNewIngredientPopup = boolean => ({
	type: 'SET_NEW_INGREDIENT_POPUP',
	boolean
});

export const SET_EDIT_INGREDIENT_POPUP = 'SET_EDIT_INGREDIENT_POPUP';
export const setEditIngredientPopup = boolean => ({
	type: 'SET_EDIT_INGREDIENT_POPUP',
	boolean
});

export const SET_EDIT_INGREDIENT_INDEX = 'SET_EDIT_INGREDIENT_INDEX';
export const setEditIngredientIndex = index => ({
	type: 'SET_EDIT_INGREDIENT_INDEX',
	index
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

export const EDIT_INGREDIENT = 'EDIT_INGREDIENT';
export const editIngredient = (editedIngredient,index) => ({
	type: 'EDIT_INGREDIENT',
	editedIngredient,
	index
});

export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const deleteIngredient = index => ({
	type: 'DELETE_INGREDIENT',
	index
});

export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';
export const clearIngredients = () => ({
	type: 'CLEAR_INGREDIENTS'
});

export const RECALCULATE_ABV = 'RECALCULATE_ABV';
export const recalculateABV = () => ({
	type: 'RECALCULATE_ABV'
});

export const CHANGE_RECIPE_NAME = 'CHANGE_RECIPE_NAME';
export const changeRecipeName = recipeName => ({
	type: 'CHANGE_RECIPE_NAME',
	recipeName
});