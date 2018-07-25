import {createStore, combineReducers} from 'redux';
import {mixerHubReducer} from './reducers';
import {reducer as formReducer} from 'redux-form';
export default createStore(
	combineReducers({
		mixerHub: mixerHubReducer,
		form: formReducer
	})
);