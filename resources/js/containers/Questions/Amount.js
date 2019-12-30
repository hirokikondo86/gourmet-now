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
        color: 'black'
    },
    backBtn: {
        width: 300,
        height: 50,
        margin: '0 auto'
    }
})

class Amount extends React.Component {
    render() {
        const { classes, actions } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.toolbar} />
                <h1 className={classes.title}>どれくらい食べたい？</h1>
                <div className={classes.boxArea}> {/* クリックしたことがわかるように */}
                    <Link to="genre" className={classes.link} onClick={() => actions.saveAmountAnswer('FREE_FOOD')}><Button variant="outlined" color="secondary" className={classes.btn}>食べ放題</Button></Link>
                    <Link to="genre" className={classes.link} onClick={() => actions.saveAmountAnswer('FREE_DRINK')}><Button variant="outlined" color="secondary" className={classes.btn}>飲み放題</Button></Link>
                    <Link to="genre" className={classes.link} onClick={() => actions.saveAmountAnswer('FREE_FOOD_DRINK')}><Button variant="outlined" color="secondary" className={classes.btn}>両方とも！</Button></Link>
                    <Link to="genre" className={classes.link} onClick={() => actions.saveAmountAnswer('DEFAULT')}><Button variant="outlined" color="secondary" className={classes.btn}>どっちでも</Button></Link>
                </div>
                <p className={classes.backBtn}><Link to="/" className={classes.link}><Button startIcon={<Replay />} className={classes.backBtn} variant="outlined" color="primary">やり直す</Button></Link></p>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

const StyledAmount = withStyles(styles, { withTheme: true })(Amount)

export default connect(null, mapDispatchToProps)(StyledAmount)