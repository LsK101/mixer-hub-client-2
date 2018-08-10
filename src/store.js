import {createStore, combineReducers} from 'redux';
import {authReducer} from './reducers/auth';
import {abvCalcReducer} from './reducers/abvcalc';
import {reducer as formReducer} from 'redux-form';
export default createStore(
	combineReducers({
		auth: authReducer,
		abvcalc: abvCalcReducer,
		form: formReducer
	})
);