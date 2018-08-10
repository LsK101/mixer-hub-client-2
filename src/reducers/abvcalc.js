import * as actions from '../actions/abvcalc';

const initialState = {
	simpleCalc: true,
	SimpleCount: 0,
	SimpleABV: [],
	SimpleParts: [],
	ExactCount: 0,
	ExactABV: [],
	ExactABVConverted: [],
	ExactAmount: [],
	ExactUnits: [],
	ExactAmountConverted: []
}

export const abvCalcReducer = (state=initialState, action) => {
	return state;
}