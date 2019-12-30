import * as actionTypes from '../utils/actionTypes'

const initialState = {
    freeFood: 0,
    freeDrink: 0
}

const AmountReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FREE_FOOD:
            return {
                ...state,
                freeFood: 1
            }
        case actionTypes.FREE_DRINK:
            return {
                ...state,
                freeDrink: 1
            }
        case actionTypes.FREE_FOOD_DRINK:
            return {
                ...state,
                freeFood: 1,
                freeDrink: 1
            }
        case actionTypes.DEFAULT:
            return {
                ...state,
                freeFood: 0,
                freeDrink: 0
            }
        default:
            return state
    }
}

export default AmountReducer