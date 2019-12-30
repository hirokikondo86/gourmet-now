import { combineReducers } from 'redux'
import NotificationReducer from './NotificationReducer'
import LoginDialogReducer from './LoginDialogReducer'
import AuthReducer from './AuthReducer'
import QuestionsReducer from './QuestionsReducer'
import AmountReducer from './AmountReducer'
import HttpReducer from './HttpReducer'
import UserReducer from './UserReducer'
import LoadingReducer from './LoadingReducer'

const reducers = combineReducers({
    NotificationReducer,
    LoginDialogReducer,
    AuthReducer,
    QuestionsReducer,
    AmountReducer,
    HttpReducer,
    UserReducer,
    LoadingReducer
})

export default reducers