import {createStore, combineReducers} from 'redux';
import {authReducer} from './reducers/auth';
import {reducer as formReducer} from 'redux-form';
export default createStore(
	combineReducers({
		auth: authReducer,
		form: formReducer
	})
);