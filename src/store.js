import {createStore, combineReducers} from 'redux';
import {authReducer} from './reducers/auth';
import {abvCalcReducer} from './reducers/abvcalc';
import {browseRecipesReducer} from './reducers/browse-recipes';
import {manageRecipesReducer} from './reducers/manage-recipes';
import {reducer as formReducer} from 'redux-form';
export default createStore(
	combineReducers({
		auth: authReducer,
		abvcalc: abvCalcReducer,
		browseRecipes: browseRecipesReducer,
		manageRecipes: manageRecipesReducer,
		form: formReducer
	})
);