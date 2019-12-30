import * as actionTypes from '../utils/actionTypes'

const initialState = {
    isAuthenticated: false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return state
    }
}

export default AuthReducer
