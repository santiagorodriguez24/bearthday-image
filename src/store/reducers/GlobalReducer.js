import { CHANGE_GLOBAL_PROPS } from '../action-types';
import { handleActions } from 'redux-actions';

const initialState = {
    fontsLoaded: false
};

function updateState(state, newProps) {
    let newState = Object.assign({}, state, newProps);
    return newState;
}

const global = handleActions(
    {
        [CHANGE_GLOBAL_PROPS]: (state, action) => {
            let newState = updateState(state, action.payload);
            return newState;
        }

    },
    initialState
);

export default global;