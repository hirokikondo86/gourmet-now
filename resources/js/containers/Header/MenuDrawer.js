import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { bindActionCreators } from 'redux'
import MenuDrawerItem from '../../components/Header/MenuDrawerItem'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import InfoIcon from '@material-ui/icons/Info'
import HomeIcon from '@material-ui/icons/Home'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockOpen from '@material-ui/icons/LockOpen'
import HowToReg from '@material-ui/icons/HowToReg'
import IconButton from '@material-ui/core/IconButton'
import getDateTime from '../../utils/getDateTime'
import checkExp from '../../utils/checkExp'

const drawerWidth = 250 // Width for Drawer

const styles = theme => ({
    navIcon: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        color: 'white'
    },
    user: {
        backgroundColor: '#eee'
    },
    drawer: {
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerTitle: {
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none',
    },
    memberText: {
        textAlign: 'center',
        paddingTop: 10,
    },
    member: theme.mixins.toolbar, // Toolbarの最小の高さ
})

class MenuDrawer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mobileOpen: false,
        }
        this.drawerNavToggle = this.drawerNavToggle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    render() {

        const { actions, AuthReducer, UserReducer } = this.props

        const { theme, classes } = this.props

        const unAuthContent = (
            <div>
                <List>
                    <ListItem button onClick={actions.toggleLoginDialog}>
                        <ListItemIcon>{<LockOpen />}</ListItemIcon>
                        <ListItemText primary="ログイン" />
                    </ListItem>
                </List>
                <List>
                    <MenuDrawerItem
                        to="/signup"
                        icon={<HowToReg />}
                        text="新規会員登録"
                    />
                </List>
            </div>
        )

        const authContent = (
            <div>
                <List>
                    <MenuDrawerItem
                        to="/mypage"
                        icon={<AccountCircle />}
                        text="マイページ"
                    />
                </List>
                <List>
                    <ListItem button onClick={this.handleSubmit}>
                        <ListItemIcon>{<LockOpen />}</ListItemIcon>
                        <ListItemText primary="ログアウト" />
                    </ListItem>
                </List>
            </div>
        )

        const drawer = (
            <div>
                <List className={classes.user}>
                    <ListItem>
                        <ListItemText
                            disableTypography
                            primary={<Typography className={classes.drawerTitle}>{AuthReducer.isAuthenticated ? UserReducer.name.replace(/"/g, '') : 'ゲスト'} さま</Typography>}
                        />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <MenuDrawerItem
                        to="/"
                        icon={<HomeIcon />}
                        text="トップページ"
                    />
                </List>
                {AuthReducer.isAuthenticated ? authContent : unAuthContent}
                <List>
                    <MenuDrawerItem
                        to="/about"
                        icon={<InfoIcon />}
                        text="グルメなうとは"
                    />
                </List>
            </div>
        )

        return (
            <div>
                <IconButton
                    aria-label="Menu"
                    onClick={this.drawerNavToggle}
                    className={classes.navIcon}
                >
                    <MenuIcon />
                </IconButton>
                <nav className={classes.drawer} aria-label="link">
                    <Hidden mdUp> {/* md未満 */}
                        <Drawer
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClick={this.drawerNavToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css"> {/* md以上 */}
                        <Drawer
                            variant="permanent"
                            open
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
            </div>
        )
    }

    drawerNavToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen })
    }

    handleSubmit() {
        const exp = JSON.parse(localStorage.getItem('token')).exp
        const now = getDateTime()
        if (checkExp(exp, now)) {
            localStorage.removeItem('token')
            return
        }
        this.props.actions.jwtLogoutUser()
    }
}

const mapStateToProps = state => ({
    AuthReducer: state.AuthReducer,
    UserReducer: state.UserReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

const StyledMenuDrawer = withStyles(styles, { withTheme: true })(MenuDrawer)

export default connect(mapStateToProps, mapDispatchToProps)(StyledMenuDrawer)