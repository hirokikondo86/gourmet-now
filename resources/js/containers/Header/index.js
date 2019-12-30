import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuDrawer from './MenuDrawer'
import ShareDialog from './ShareDialog'
import logo from '../../img/logo.png'

const drawerWidth = 250 // Width for Drawer

const styles = theme => ({
    appBar: {
        width: '100%',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        backgroundColor: '#de9610'
    },
    toolBar: {
    },
    title: {
        margin: 'auto',
        textDecoration: 'none',
        color: 'white',
        fontFamily: '"M PLUS Rounded 1c"',
        fontSize: '10px'
    },
    logo: {
        width: 23,
        paddingRight: 5,
    },
})

const Header = ({ classes }) => (
    <div className={classes.header}>
        <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <MenuDrawer />
                <Link to="/" className={classes.title}>
                    <h1>
                        <img src={logo} alt="Header logo" className={classes.logo} />
                        グルメなう
                    </h1>
                </Link>
                <ShareDialog />
            </Toolbar>
        </AppBar>
    </div>
)

const styledHeader = withStyles(styles, { withTheme: true })(Header)
export default styledHeader