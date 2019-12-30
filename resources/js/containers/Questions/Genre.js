import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import Search from '@material-ui/icons/Search'
import Replay from '@material-ui/icons/Replay'

const drawerWidth = 250 // Width for Drawer

const styles = (theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        padding: 30
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
    select: {
        width: '30vmin',
        height: '30vmin',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        color: 'black',
    },
    btnArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        textDecoration: 'none'
    },
    searchBtn: {
        width: 350,
        height: 50,
        marginBottom: 30
    },
    backBtn: {
        width: 300,
        height: 50,
        margin: '0 auto'
    }
})

class Genre extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes, actions } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.toolbar} />
                <h1 className={classes.title}>何が食べたい？</h1>
                <div className={classes.boxArea}>
                    <Link to="result" className={classes.link}><Button variant="outlined" color="secondary" className={classes.select} onClick={() => actions.saveAnswers('GENRE', 'G001')}>居酒屋</Button></Link>
                    <Link to="result" className={classes.link}><Button variant="outlined" color="secondary" className={classes.select} onClick={() => actions.saveAnswers('GENRE', 'G004')}>和食</Button></Link>
                    <Link to="result" className={classes.link}><Button variant="outlined" color="secondary" className={classes.select} onClick={() => actions.saveAnswers('GENRE', 'G013')}>ラーメン</Button></Link>
                    <Link to="result" className={classes.link}><Button variant="outlined" color="secondary" className={classes.select} onClick={() => actions.saveAnswers('GENRE', 'G007')}>中華</Button></Link>
                    <Link to="result" className={classes.link}><Button variant="outlined" color="secondary" className={classes.select} onClick={() => actions.saveAnswers('GENRE', 'G008')}>焼肉</Button></Link>
                    <Link to="result" className={classes.link}><Button variant="outlined" color="secondary" className={classes.select} onClick={() => actions.saveAnswers('GENRE', 'G017')}>韓国料理</Button></Link>
                    <Link to="result" className={classes.link}><Button variant="outlined" color="secondary" className={classes.select} onClick={() => actions.saveAnswers('GENRE', 'G014')}>カフェ<br />・<br />スイーツ</Button></Link>
                    <Link to="result" className={classes.link}><Button variant="outlined" color="secondary" className={classes.select} onClick={() => actions.saveAnswers('GENRE', 'G015')}>それ以外！</Button></Link>
                </div>
                <p className={classes.backBtn}><Link to="/" className={classes.link}><Button startIcon={<Replay />} className={classes.backBtn} variant="outlined" color="primary">やり直す</Button></Link></p>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    QuestionsReducer: state.QuestionsReducer,
    AmountReducer: state.AmountReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

const StyledGenre = withStyles(styles, { withTheme: true })(Genre)

export default connect(mapStateToProps, mapDispatchToProps)(StyledGenre)