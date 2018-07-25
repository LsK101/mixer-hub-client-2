import * as actions from '../actions';

const initialState = {
	currentUser: null,
	authToken: null
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
	return state;
}