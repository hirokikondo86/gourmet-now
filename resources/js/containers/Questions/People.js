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

class People extends React.Component {
    render() {
        const { classes, actions } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.toolbar} />
                <h1 className={classes.title}>いまの人数は？</h1>
                <div className={classes.boxArea}> {/* クリックしたことがわかるように */}
                    <Link to="budget" className={classes.link} onClick={() => actions.saveAnswers('PEOPLE', 1)}><Button variant="outlined" color="secondary" className={classes.btn}>１人</Button></Link>
                    <Link to="budget" className={classes.link} onClick={() => actions.saveAnswers('PEOPLE', 2)}><Button variant="outlined" color="secondary" className={classes.btn}>２〜３人</Button></Link>
                    <Link to="budget" className={classes.link} onClick={() => actions.saveAnswers('PEOPLE', 4)}><Button variant="outlined" color="secondary" className={classes.btn}>４〜１０人</Button></Link>
                    <Link to="budget" className={classes.link} onClick={() => actions.saveAnswers('PEOPLE', 11)}><Button variant="outlined" color="secondary" className={classes.btn}>１１〜２０人</Button></Link>
                    <Link to="budget" className={classes.link} onClick={() => actions.saveAnswers('PEOPLE', 21)}><Button variant="outlined" color="secondary" className={classes.btn}>それ以上！</Button></Link>
                </div>
                <p className={classes.backBtn}><Link to="/" className={classes.link}><Button startIcon={<Replay />} className={classes.backBtn} variant="outlined" color="primary">やり直す</Button></Link></p>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

const StyledPeople = withStyles(styles, { withTheme: true })(People)

export default connect(null, mapDispatchToProps)(StyledPeople)