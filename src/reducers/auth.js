import * as actions from '../actions/auth';

const initialState = {
	currentUser: null,
	currentFirstName: null,
	authToken: null,
	showLogin: false,
	showSignup: false,
	showNavbar: false,
	loginLoading: false,
	signupLoading: false
}

export const authReducer = (state=initialState, action) => {
	if (action.type === actions.CHANGE_CURRENT_USER && action.user !== null) {
		return Object.assign({}, state, {
			currentUser: action.user.username,
			currentFirstName: action.user.firstName
		});
	}
	else if (action.type === actions.CHANGE_CURRENT_USER && action.user === null) {
		return Object.assign({}, state, {
			currentUser: null,
			currentFirstName: null
		});
	}
	else if (action.type === actions.SET_AUTH_TOKEN) {
		return Object.assign({}, state, {
			authToken: action.authToken
		});
	}
	else if (action.type === actions.SHOW_LOGIN_POPUP) {
		return Object.assign({}, state, {
			showLogin: action.showLogin
		});
	}
	else if (action.type === actions.SHOW_SIGNUP_POPUP) {
		return Object.assign({}, state, {
			showSignup: action.showSignup
		});
	}
	else if (action.type === actions.TOGGLE_NAVBAR) {
		return Object.assign({}, state, {
			showNavbar: !action.toggleNavbar
		});
	}
	else if (action.type === actions.SET_LOGIN_LOADING) {
		return Object.assign({}, state, {
			loginLoading: action.loginLoading
		});
	}
	else if (action.type === actions.SET_SIGNUP_LOADING) {
		return Object.assign({}, state, {
			signupLoading: action.signupLoading
		});
	}
	return state;
}