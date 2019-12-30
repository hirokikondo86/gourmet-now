import React from 'react'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import mobile from '../../img/mobile.jpg'
import shop from '../../img/shop.jpg'
import Search from '@material-ui/icons/Search'
import Lottie from "react-lottie"
import animationData from "../../lottie/down.json"

const drawerWidth = 250 // Width for Drawer

const styles = (theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        width: '100%'
    },
    toolbar: theme.mixins.toolbar,
    bgImg: {
        backgroundImage: 'url(../../images/top.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    topContainer: {
        height: '600px',
    },
    title: {
        width: 330,
        margin: '0 auto',
        padding: 5,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50,
        fontSize: 20,
        backgroundColor: '#de9610',
        color: 'white'
    },
    titleLogo: {
        width: 80,
        height: 80,
        marginRight: 8,
    },
    titleText: {
        fontFamily: '"M PLUS Rounded 1c"',
        color: 'black',
        fontWeight: 'bold'
    },
    link: {
        textDecoration: 'none'
    },
    start: {
        width: 250,
        height: 70,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        fontSize: 20,
        textDecoration: 'none',
        color: 'white'
    },
    usgContainer: {
        textAlign: 'center',
        marginBottom: 30
    },
    container: {
        display: 'flex'
    },
    cont: {
        margin: '0 auto'
    },
    usgTitle: {
        marginTop: 40
    },
    lottie: {
        pointerEvents: 'none',
        textAlign: 'center',
        marginTop: 200
    }
})

class Top extends React.Component {
    render() {
        const { classes } = this.props
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }

        return (
            <div className={classes.root}>
                <div className={classes.bgImg}>
                    <div className={classes.toolbar} />
                    <section className={classes.topContainer}>
                        <div className={classes.title}>
                            お気に入りのお店を見つけよう！
                        </div>
                        <Link to="/people" className={classes.link}><Button startIcon={<Search />} variant="contained" color="primary" className={classes.start}>お店を探す</Button></Link>
                        <div className={classes.lottie}>
                            <Button><Lottie options={defaultOptions} height={120} width={120} /></Button>
                        </div>
                    </section>
                </div>
                <section className={classes.usgContainer}>
                    <h1 className={classes.usgTitle}>グルメなうの使用方法</h1>
                    <div className={classes.container}>
                        <div className={classes.cont}>
                            <p className={classes.txt}>質問に回答</p>
                            <p><img src={mobile} width="70" /></p>
                        </div>
                        <div className={classes.cont}>
                            <p className={classes.txt}>現在地周辺のお店を表示</p>
                            <p><img src={shop} width="70" /></p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Top)