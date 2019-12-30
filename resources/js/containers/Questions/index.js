import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from '@material-ui/core'

const drawerWidth = 250 // Width for Drawer

const styles = (theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        padding: 30
    },
    toolbar: theme.mixins.toolbar // Toolbarの最小の高さ
})

class People extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route exact path="/" component={Top} />
                    <Route exact path="/people" component={People} />
                    <Route exact path="/budget" component={Budget} />
                    <Route exact path="/amount" component={Amount} />
                    <Route exact path="/genre" component={Genre} />
                </Switch>
            </div>
        )
    }
}

const styledPeople = withStyles(styles, { withTheme: true })(People)
export default styledPeople