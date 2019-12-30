import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import Replay from '@material-ui/icons/Replay'

const drawerWidth = 250 // Width for Drawer

const styles = (theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        padding: 30,
        height: '100vh'
    },
    toolbar: theme.mixins.toolbar, // Toolbarの最小の高さ
    title: {
        textAlign: 'center',
    },
    boxArea: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 40,
        marginTop: 50
    },
    link: {
        textDecoration: 'none'
    },
    btn: {
        width: '30vmin',
        height: '30vmin',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        color:'black'
    },
    backBtn: {
        width: 300,
        height: 50,
        margin: '0 auto'
    }
})

class Budget extends React.Component {
    render() {
        const { classes, actions } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.toolbar} />
                <h1 className={classes.title}>いまの予算は？</h1>
                <div className={classes.boxArea}> {/* クリックしたことがわかるように */}
                    <Link to="amount" className={classes.link} onClick={() => actions.saveAnswers('BUDGET', 'B011')}><Button variant="outlined" color="secondary" className={classes.btn}>１００１<br />〜<br />１５００</Button></Link>
                    <Link to="amount" className={classes.link} onClick={() => actions.saveAnswers('BUDGET', 'B001')}><Button variant="outlined" color="secondary" className={classes.btn}>１５０１<br />〜<br />２０００</Button></Link>
                    <Link to="amount" className={classes.link} onClick={() => actions.saveAnswers('BUDGET', 'B002')}><Button variant="outlined" color="secondary" className={classes.btn}>２００１<br />〜<br />３０００</Button></Link>
                    <Link to="amount" className={classes.link} onClick={() => actions.saveAnswers('BUDGET', 'B003')}><Button variant="outlined" color="secondary" className={classes.btn}>３００１<br />〜<br />４０００</Button></Link>
                    <Link to="amount" className={classes.link} onClick={() => actions.saveAnswers('BUDGET', 'B008')}><Button variant="outlined" color="secondary" className={classes.btn}>４００１<br />〜<br />５０００</Button></Link>
                    <Link to="amount" className={classes.link} onClick={() => actions.saveAnswers('BUDGET', 'B004')}><Button variant="outlined" color="secondary" className={classes.btn}>それ以上！</Button></Link>
                </div>
                <p className={classes.backBtn}><Link to="/" className={classes.link}><Button startIcon={<Replay />} className={classes.backBtn} variant="outlined" color="primary">やり直す</Button></Link></p>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

const StyledBudget = withStyles(styles, { withTheme: true })(Budget)

export default connect(null, mapDispatchToProps)(StyledBudget)