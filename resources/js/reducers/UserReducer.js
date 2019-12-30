import * as actionTypes from '../utils/actionTypes'

const initialState = {
    name : ''
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NAME:
            return {
                ...state,
                name: action.name
            }
        default:
            return state
    }
}

export default UserReducer
