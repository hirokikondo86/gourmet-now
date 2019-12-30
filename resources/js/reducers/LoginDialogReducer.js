import * as actionTypes from '../utils/actionTypes'

const initialState = {
    loginDialogOpen: false,
}

const LoginDialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_LOGIN_DIALOG:
            return Object.assign({}, state, {
                loginDialogOpen: !state.loginDialogOpen
            })
        case actionTypes.CLOSE_LOGIN_DIALOG:
            return Object.assign({}, state, {
                loginDialogOpen: false
            })
        default:
            return state
    }
}

export default LoginDialogReducer