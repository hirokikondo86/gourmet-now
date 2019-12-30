import * as actionTypes from '../utils/actionTypes'

const initialState = {
    isRequesting: false,
}

const HttpReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HTTP_REQUEST:
            return {
                ...state,
                isRequesting: true
            }
        case actionTypes.HTTP_SUCCESS:
            return {
                ...state,
                isRequesting: false
            }
        case actionTypes.HTTP_FAILURE:
            return {
                ...state,
                isRequesting: false
            }
        default:
            return state
    }
}

export default HttpReducer
