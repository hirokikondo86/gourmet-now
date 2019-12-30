import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { Redirect } from "react-router-dom"

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import { DialogContentText } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = () => ({
    root: {
        display: 'flex',
        justifyContent: 'center', /* 子要素を中央揃え */
    },
    title: {
        display: 'flex',
        justifyContent: 'center', /* 子要素を中央揃え */
        position: 'relative',
    },
    loginTitle: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'normal',
    },
    close: {
        position: 'absolute',
        right: 3,
        color: 'gray'
    },
    input: {
        width: '100%',
        marginBottom: 20,
        fontSize: 15
    },
    loginButton: {
        width: 200,
        height: 50,
        margin: 'auto',
        marginTop: 10,
        marginBottom: 30,
        color: 'white',
        fontSize: 15,
        cursor: 'pointer'
    },
    signupTitle: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 'normal',
        fontSize: 20
    },
    signupText: {
        textAlign: 'center',
        fontSize: 10
    },
    signupButton: {
        width: 200,
        height: 50,
        margin: 'auto',
        marginBottom: 30,
        color: 'white',
        backgroundColor: '#bbb',
        fontSize: 15
    },
})

class LoginDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mail: '',
            pass: '',
        }
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSignup = this.handleSignup.bind(this)
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit() {
        const values = {
            email: this.state.mail,
            password: this.state.pass,
        }
        this.props.actions.jwtLoginUser(values, history)
    }

    handleSignup() {
        this.props.history.push('/signup')
        this.props.actions.closeLoginDialog()
    }

    render() {
        const { classes } = this.props
        const { LoginDialogReducer, AuthReducer, actions } = this.props

        return (
            AuthReducer.isAuthenticated && localStorage.getItem('token') ? (
                <Redirect to={'/'} />
            ) : (
                    <div className={classes.root}>
                        <Dialog
                            fullWidth={true}
                            open={LoginDialogReducer.loginDialogOpen}
                            onClose={actions.toggleLoginDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            className={classes.content}
                        >
                            <div className={classes.title}>
                                <h6 className={classes.loginTitle}>
                                    ログイン
                                </h6>
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    className={classes.close}
                                    onClick={actions.toggleLoginDialog}
                                >
                                    <CloseIcon className={classes.icon} />
                                </IconButton>
                            </div>
                            <DialogContent>
                                <TextField
                                    required
                                    label="名前"
                                    name="mail"
                                    className={classes.input}
                                    onChange={e => this.handleOnChange(e)}
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    type="password"
                                    label="パスワード"
                                    name="pass"
                                    className={classes.input}
                                    onChange={e => this.handleOnChange(e)}
                                    variant="outlined"
                                />
                            </DialogContent>
                            <Button onClick={this.handleSubmit} variant="contained" color="primary" className={classes.loginButton}>
                                {this.props.HttpReducer.isRequesting ? <CircularProgress /> : 'ログイン'}
                            </Button>
                            <Divider variant="middle" />
                            <DialogContent>
                                <h6 className={classes.signupTitle}>
                                    初めてのお客様
                                </h6>
                                <DialogContentText className={classes.signupText}>
                                    サービスを最大限利用するには会員登録が必要です
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleSignup} to="/signup" variant="contained" className={classes.signupButton}>
                                    新規会員登録
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )
        )
    }
}

const mapStateToProps = state => ({
    LoginDialogReducer: state.LoginDialogReducer,
    AuthReducer: state.AuthReducer,
    HttpReducer: state.HttpReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch) // Actionを自動的にマッピング
})

const StyledLoginDialog = withStyles(styles, { withTheme: true })(LoginDialog)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StyledLoginDialog))