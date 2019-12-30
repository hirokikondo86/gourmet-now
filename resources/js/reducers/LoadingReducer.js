import * as actionTypes from '../utils/actionTypes'

const initialState = {
    loadingOpen: false,
}

const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_LOADING:
            return Object.assign({}, state, {
                loadingOpen: !state.loadingOpen
            })
        default:
            return state
    }
}

export default LoadingReducer