import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import { Route, Switch } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Notification from './containers/Notification'
import Header from './containers/Header'
import Top from './containers/Top'
import People from './containers/Questions/People'
import Budget from './containers/Questions/Budget'
import Amount from './containers/Questions/Amount'
import Genre from './containers/Questions/Genre'
import Result from './containers/Result'
import MyPage from './containers/MyPage'
import Login from './containers/Login'
import Signup from './containers/Signup'
import About from './containers/About'
import LoadingDialog from './containers/LoadingDialog'
import getDateTime from './utils/getDateTime'
import checkExp from './utils/checkExp'

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#de9610',        // 基本の色
            contrastText: '#fff',   // テキストの色
        },
        secondary: {
            main: '#bbb',
            contrastText: '#fff',
        }
    },
})

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        if (token) {
            const exp = JSON.parse(localStorage.getItem('token')).exp
            const now = getDateTime()
            if (checkExp(exp, now)) {               // 有効期限が切れている場合はログアウト
                this.props.actions.logoutUser
                localStorage.removeItem('token')
            } else {
                this.props.actions.getFavorites()   // 有効期限内の場合はお気に入りとユーザ情報を取得
                this.props.actions.getUser()
            }
        } else {
            this.props.actions.logoutUser

            let favorites = localStorage.getItem('favorites')
            if (favorites) {
                localStorage.removeItem('favorites')
            }
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <Notification />
                    <Login />
                    <LoadingDialog />
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Top} />
                        <Route exact path="/people" component={People} />
                        <Route exact path="/budget" component={Budget} />
                        <Route exact path="/amount" component={Amount} />
                        <Route exact path="/genre" component={Genre} />
                        <Route exact path="/result" component={Result} />
                        <Route exact path="/mypage" component={MyPage} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/about" component={About} />
                    </Switch>
                </CssBaseline>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = state => ({
    AuthReducer: state.AuthReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)