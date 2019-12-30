import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import star from '../../img/star.png'
import star02 from '../../img/star02.png'
import Lottie from "react-lottie"
import animationData from "../../lottie/like.json"
import { Redirect } from "react-router-dom"


const drawerWidth = 250

const styles = (theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        padding: 30
    },
    toolbar: theme.mixins.toolbar,
    title: {
        fontWeight: 'normal',
        textAlign: 'center'
    },
    card: {
        marginBottom: 30
    },
    cardContent: {
        textAlign: 'center'
    },
    cardTitle: {
        textDecoration: 'none',
        color: 'black'
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    more: {
        textDecoration: 'none',
        color: 'black'
    },
    noFavTitle: {
        textAlign: 'center',
        marginBottom: 30,
        fontSize: 20
    },
    noFavText: {
        textAlign: 'center',
    },
    lottie: {
        pointerEvents: 'none',
        textAlign: 'center',
    }
})

class MyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            favs: '',
        }
    }

    render() {
        const { classes } = this.props
        const favs = Array.from(this.state.favs) // objはmap()できないのでarrayに変換
        const { AuthReducer } = this.props

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }

        return (
            AuthReducer.isAuthenticated ? (
                <div className={classes.root}>
                    <div className={classes.toolbar} />
                    <h1 className={classes.title}>My Page</h1>
                    {favs.length > 0 ?
                        favs.map((fav, i) => (
                            <Card className={classes.card} key={i}>
                                <CardContent className={classes.cardContent}>
                                    <h2><a href={fav.shop_url} target="_blank" className={classes.cardTitle}>{fav.title}</a></h2>
                                    <p>ー {fav.catch} ー</p>
                                    <p><img src={fav.img_url} alt="shop image" width="100%" /></p>
                                </CardContent>
                                <CardActions className={classes.cardAction}>
                                    <Button size="small">
                                        <a href={fav.shop_url} target="_blank" className={classes.more}>Show More</a>
                                    </Button>
                                    <Button>
                                        <p className={classes.star} onClick={() => this.handleToggle(fav.id, fav.title, fav.catch, fav.img_url, fav.shop_url)}><img src={star02} alt="like" width='30' id={fav.id} /></p>
                                    </Button>
                                </CardActions>
                                {/* localstorageの該当shop_idのfavを消去 & DBの該当user_id, shop_idデータを非同期で消去 & localstorageから再取得*/}
                            </Card>
                        )) : (
                            <>
                                <p className={classes.noFavTitle}>いいねしたお店はありません。</p>
                                <p className={classes.noFavText}>気に入ったお店はいいねしよう！！</p>
                                <div className={classes.lottie}>
                                    <Lottie options={defaultOptions} height={120} width={120} />
                                </div>
                            </>
                        )}
                </div>
            ) : (<Redirect to={'/'} />)
        )
    }

    handleToggle = (id, title, cat, img, url) => {
        const el = document.getElementById(id)
        if (el.alt == 'like') {
            el.src = '../images/star.png'
            el.alt = 'liked'
            this.props.actions.delFavorite(id)
        } else {
            el.src = '../images/star02.png'
            el.alt = 'like'
            this.props.actions.addFavorite(id, title, cat, img, url)
        }
    }

    componentDidMount() {
        this.setState({ favs: JSON.parse(localStorage.getItem('favorites')) })
    }
}


const mapStateToProps = state => ({
    AuthReducer: state.AuthReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

const StyledMyPage = withStyles(styles, { withTheme: true })(MyPage)
export default connect(mapStateToProps, mapDispatchToProps)(StyledMyPage)