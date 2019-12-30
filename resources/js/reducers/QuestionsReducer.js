import * as actionTypes from '../utils/actionTypes'

const initialState = {
    people: 0,
    budget: '',
    genre: '',
}

const QuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PEOPLE_ANSWER:
            return {
                ...state,
                people: action.answer
            }
        case actionTypes.BUDGET_ANSWER:
            return {
                ...state,
                budget: action.answer
            }
        case actionTypes.GENRE_ANSWER:
            return {
                ...state,
                genre: action.answer
            }
        default:
            return state
    }
}

export default QuestionsReducer