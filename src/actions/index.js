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

export const SHOW_LOGIN_POPUP = 'SHOW_LOGIN_POPUP';
export const showLoginPopup = showLogin => ({
	type: 'SHOW_LOGIN_POPUP',
	showLogin
});

export const SHOW_SIGNUP_POPUP = 'SHOW_SIGNUP_POPUP';
export const showSignupPopup = showSignup => ({
	type: 'SHOW_SIGNUP_POPUP',
	showSignup
});