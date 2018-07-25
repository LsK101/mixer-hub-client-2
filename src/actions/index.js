export const CHANGE_CURRENT_USER = 'CHANGE_CURRENT_USER';
export const changeCurrentUser = user => ({
	type: 'CHANGE_CURRENT_USER',
	user
});

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
	type: 'SET_AUTH_TOKEN',
	authToken
});