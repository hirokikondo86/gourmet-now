import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

const drawerWidth = 250 // Width for Drawer

const styles = (theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        padding: 30
    },
    title: {
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'normal',

    },
    toolbar: theme.mixins.toolbar, // Toolbarの最小の高さ
    bread: {
        color: '#aaa',
        fontSize: 10,
        textAlign: 'center',
        padding: 10
    },
    presentLocation: {
        color: 'black'
    },
    content: {
        margin: 'auto',
        paddingTop: 30,
        borderTop: 'thin solid #ccc',
        padding: 20
    },
    input: {
        width: '100%'
    },
    inputName: {
        width: '40%',
        marginRight: 20
    },
    inputBox: {
        marginBottom: 20
    },
    signupBtn: {
        width: 300,
        display: 'flex',
        margin: 'auto',
        marginTop: 20,
        fontSize: 15,
        textDecoration: 'none'
    },
    signupBackBtn: {
        backgroundColor: '#bbb'
    },
    confirmText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 30
    },
    confirmTable: {
        width: '90%',
        margin: 'auto',
        marginBottom: 50,
        border: 'thin solid #aaa',
        borderCollapse: 'collapse'
    },
    tableHeader: {
        width: '40%',
        padding: 15,
        textAlign: 'center',
        backgroundColor: '#ddd'
    },
    tableData: {
        padding: 10
    }
})

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmed: false,
            firstName: '',
            lastName: '',
            firstFuri: '',
            lastFuri: '',
            mail: '',
            pass: '',
            passConf: '',
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleClick() {
        this.setState({
            confirmed: true,
        })
    }

    handleBack() {
        this.setState({
            confirmed: false,
            pass: '',
            passConf: '',
        })
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit() {
        const name = this.state.lastName + this.state.firstName
        const furi = this.state.lastFuri + this.state.firstFuri
        const values = {
            name: name,
            furigana: furi,
            email: this.state.mail,
            password: this.state.pass,
            password_confirmation: this.state.passConf,
        }
        this.props.actions.jwtSignupUser(values, history)
    }

    render() {
        const { classes } = this.props
        let contents = ""

        if (!this.state.confirmed) {
            contents = (
                <div>
                    <p className={classes.bread}><span className={classes.presentLocation}>会員情報入力</span>　＞　登録情報の確認　＞　完了</p>
                    <div className={classes.content}>
                        < TextField
                            required
                            name="lastName"
                            label="苗字"
                            className={classes.inputName}
                            onChange={e => this.handleOnChange(e)}
                            margin="normal"
                            variant="outlined"
                            value={this.state.lastName}
                        />
                        <TextField
                            required
                            name="firstName"
                            label="名前"
                            className={classes.inputName}
                            onChange={e => this.handleOnChange(e)}
                            margin="normal"
                            variant="outlined"
                            value={this.state.firstName}
                        />
                        <TextField
                            required
                            name="lastFuri"
                            label="苗字(ふりがな)"
                            className={classes.inputName}
                            onChange={e => this.handleOnChange(e)}
                            margin="normal"
                            variant="outlined"
                            value={this.state.lastFuri}
                        />
                        <TextField
                            required
                            name="firstFuri"
                            label="名前(ふりがな)"
                            className={classes.inputName}
                            onChange={e => this.handleOnChange(e)}
                            margin="normal"
                            variant="outlined"
                            value={this.state.firstFuri}
                        />
                        <TextField
                            required
                            name="mail"
                            label="メールアドレス"
                            className={classes.input}
                            onChange={e => this.handleOnChange(e)}
                            margin="normal"
                            variant="outlined"
                            value={this.state.mail}
                        />
                        <TextField
                            required
                            type="password"
                            name="pass"
                            label="パスワード(８文字以上)"
                            className={classes.input}
                            onChange={e => this.handleOnChange(e)}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            type="password"
                            name="passConf"
                            label="パスワード(確認)"
                            className={classes.input}
                            onChange={e => this.handleOnChange(e)}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button onClick={this.handleClick} variant="contained" color="primary" className={classes.signupBtn}>
                            確認
                        </Button>
                    </div >
                </div >
            )
        } else {
            contents = (
                <div>
                    <p className={classes.bread}>会員情報入力　＞　<span className={classes.presentLocation}>登録情報の確認</span>　＞　完了</p>
                    <div className={classes.content}>
                        <p className={classes.confirmText}>
                            登録情報を確認してください。
                            <br />「完了」を押すと登録が完了します。
                        </p>
                        <table className={classes.confirmTable} border="1">
                            <tbody>
                                <tr>
                                    <td className={classes.tableHeader}>お名前</td>
                                    <td className={classes.tableData}>{this.state.lastName}　{this.state.firstName}</td>
                                </tr>
                                <tr>
                                    <td className={classes.tableHeader}>お名前(ふりがな)</td>
                                    <td className={classes.tableData}>{this.state.lastFuri}　{this.state.firstFuri}</td>
                                </tr>
                                <tr>
                                    <td className={classes.tableHeader}>メールアドレス</td>
                                    <td className={classes.tableData}>{this.state.mail}</td>
                                </tr>
                                <tr>
                                    <td className={classes.tableHeader}>パスワード</td>
                                    <td className={classes.tableData}>{"*".repeat(this.state.pass.length)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Button onClick={this.handleSubmit} variant="contained" color="primary" className={classes.signupBtn}>
                            {this.props.HttpReducer.isRequesting ? <CircularProgress /> : '登録'}
                        </Button>
                        <Button onClick={this.handleBack} variant="contained" color="secondary" className={classes.signupBtn}>
                            変更
                            </Button>
                    </div>
                </div>
            )
        }
        return (
            <div className={classes.root}>
                <div className={classes.toolbar} />
                <h1 className={classes.title}>新規会員登録</h1>
                {contents}
            </div >
        )
    }
}

const mapStateToProps = state => ({
    AuthReducer: state.AuthReducer,
    HttpReducer: state.HttpReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

const styledSignup = withStyles(styles, { withTheme: true })(Signup)

export default connect(mapStateToProps, mapDispatchToProps)(styledSignup)