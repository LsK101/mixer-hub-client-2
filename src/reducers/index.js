import * as actions from '../actions';

const initialState = {
	currentUser: null,
	authToken: null,
	showLogin: false
}

export const mixerHubReducer = (state=initialState, action) => {
	if (action.type === actions.CHANGE_CURRENT_USER) {
		return Object.assign({}, state, {
			currentUser: action.user
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
	return state;
}