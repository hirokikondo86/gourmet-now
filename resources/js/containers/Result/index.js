import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import GoogleMapReact from 'google-map-react'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import Replay from '@material-ui/icons/Replay'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import star from '../../img/star.png'
import star02 from '../../img/star02.png'
import getIndex from '../../utils/getIndex'
import requestApi from '../../utils/requestApi'

const drawerWidth = 250             // Width for Drawer

const styles = (theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        padding: 30
    },
    toolbar: theme.mixins.toolbar,  // Toolbarの最小の高さ
    link: {
        textDecoration: 'none'
    },
    titleArea: {
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {
        margin: '0 auto',
        marginBottom: 20,
        padding: 0
    },
    btn: {
        margin: 'auto',
        textAlign: 'center',
    },
    map: {
        width: '90vmin',
        height: '90vmin',
        marginTop: 40,
        marginBottom: 50,
        margin: '0 auto'
    },
    shopListTitle: {
        textAlign: 'center'
    },
    card: {
        [theme.breakpoints.up('sm')]: {
            width: '90vmin'
        },
        width: '90vmin',
        marginBottom: 20,
        margin: '0 auto'
    },
    cardContainer: {
        textAlign: 'center',
    },
    cardTitle: {
        textDecoration: 'none',
        color: 'black',
    },
    cardImg: {
        width: '75vmin',
        borderRadius: 20
    },
    infoTbl: {
        width: '75vmin',
        borderCollapse: 'collapse',
        margin: '0 auto'
    },
    info: {
        border: 'solid 2px #ddd',
        padding: 5
    },
    share: {
        textDecoration: 'none',
        color: '#bbb'
    },
    more: {
        float: 'left',
        textDecoration: 'none',
        color: '#bbb'
    },
    favorite: {
    },
    cards: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    dialogTbl: {
        borderCollapse: 'collapse'
    },
    dialogTtl: {
        border: 'solid 2px #ddd',
        padding: 5,
        fontSize: 10,
        width: 55,
        textAlign: 'center'
    },
    dialogInfo: {
        border: 'solid 2px #ddd',
        padding: 5,
        fontSize: 10,
        textAlign: 'left'
    },
    dlogBtn: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    star: {
        textAlign: 'center',
        marginBottom: '30'
    },
    noShopTxt: {
        margin: '0 auto',
        marginBottom: 50
    }
})

const Me = () => <div><EmojiPeopleIcon /></div>
const Pin = () => <div><AddLocationIcon /></div>

class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: null,
            lng: null,
            dialogOpen: false,
            like: false,
            shops: '',
            id: '',
            access: '',
            avg: '',
            drink: '',
            food: '',
            cap: '',
            park: '',
            open: '',
            url: '',
            title: '',
            cat: '',
            img: ''
        }
    }

    render() {
        const { classes } = this.props
        // map()用
        const shops = Array.from(this.state.shops)
        // Google Maps用
        const center = { lat: this.state.lat, lng: this.state.lng }

        return (
            <div className={classes.root}>
                <div className={classes.toolbar} />

                {/* お店の詳細を表示 */}
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.dialogClose}
                >
                    <DialogContent>
                        <table className={classes.dialogTbl}>
                            <thead>
                                <tr><td className={classes.dialogTtl}>アクセス</td><td className={classes.dialogInfo}>{this.state.access}</td></tr>
                            </thead>
                            <tbody>
                                <tr><td className={classes.dialogTtl}>平均予算</td><td className={classes.dialogInfo}>{this.state.avg}</td></tr>
                                <tr><td className={classes.dialogTtl}>飲み放題</td><td className={classes.dialogInfo}>{this.state.drink}</td></tr>
                                <tr><td className={classes.dialogTtl}>食べ放題</td><td className={classes.dialogInfo}>{this.state.food}</td></tr>
                                <tr><td className={classes.dialogTtl}>最大人数</td><td className={classes.dialogInfo}>{this.state.cap}人</td></tr>
                                <tr><td className={classes.dialogTtl}>駐車場</td><td className={classes.dialogInfo}>{this.state.park}</td></tr>
                                <tr><td className={classes.dialogTtl}>open</td><td className={classes.dialogInfo}>{this.state.open}</td></tr>
                            </tbody>
                        </table>
                    </DialogContent>
                    <DialogActions className={classes.dlogBtn}>
                        <Button size="small"><a href={this.state.url} target="_blank" className={classes.more}>Show More</a></Button>
                        <Button size="small" onClick={() => this.handleToggle()}><img src={this.state.like ? star02 : star} alt="いいね" width="20" /></Button>
                        <Button onClick={this.dialogClose} color="primary" autoFocus>閉じる</Button>
                    </DialogActions>
                </Dialog>

                <div className={classes.titleArea}>
                    <h2 className={classes.title}>周辺のお店</h2>
                    <Link to="/" className={classes.link}><Button className={classes.btn} startIcon={<Replay />} variant="outlined" color="primary">やり直す</Button></Link>
                </div>

                {/* Google Mapsの表示 */}
                <div className={classes.map}>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: 'AIzaSyDXmfufz94HbjCTfGwUBF4TCIwJ2_j-KW8'
                        }}
                        center={center}
                        defaultZoom={15}
                        yesIWantToUseGoogleMapApiInternals
                    >
                        {/* 現在地 */}
                        <Me
                            lat={this.state.lat}
                            lng={this.state.lng}
                        />

                        {/* 店にピンを挿す */}
                        {shops.map((shop, i) => (
                            <Pin
                                key={i}
                                lat={shop.lat}
                                lng={shop.lng}
                            />
                        ))}
                    </GoogleMapReact>
                </div>

                {/* 店の情報の一覧表示 */}
                <h2 className={classes.shopListTitle}>お店一覧</h2>
                <div className={classes.cards}>
                    {/* 配列が空なら検索不一致 */}
                    {shops.length > 0 ?
                        shops.map((shop, i) => (
                            <Card className={classes.card} key={i}>
                                <CardActionArea
                                    className={classes.cardContainer}
                                    onClick={() => this.dialogOpen(
                                        shop.id, shop.access, shop.budget.average, shop.free_drink, shop.free_food, shop.party_capacity,
                                        shop.parking, shop.open, shop.urls.pc, shop.name, shop.genre.catch, shop.photo.mobile.l)}>
                                    <CardContent>
                                        <h2>{shop.name}</h2>
                                        <p>ー {shop.genre.catch} ー</p>
                                        <p><img src={shop.photo.mobile.l} alt="Shop image" className={classes.cardImg} /></p>
                                        <table className={classes.infoTbl}>
                                            <thead><tr><td className={classes.info}>アクセス</td></tr></thead>
                                            <tbody><tr><td className={classes.info}>{shop.access}</td></tr></tbody>
                                        </table>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )) :
                        (<p className={classes.noShopTxt}>一致するお店が見つかりませんでした。</p>)}
                </div>
            </div>
        )
    }

    handleToggle = () => {
        const token = localStorage.getItem('token')
        if (token) {
            const id = this.state.id

            if (!this.state.like) {
                const url = this.state.url
                const title = this.state.title
                const cat = this.state.cat
                const img = this.state.img

                this.props.actions.addFavorite(id, title, cat, img, url)
                this.setState({
                    like: true
                })
            } else {
                this.props.actions.delFavorite(id)
                this.setState({
                    like: false
                })
            }
        } else {
            // ログインしていない場合はログインダイアログを表示
            this.props.actions.toggleLoginDialog()
        }
    }

    dialogOpen = (id, access, avg, drink, food, cap, park, open, url, title, cat, img) => {
        // いいね済みかチェック
        if (localStorage.getItem('token')) {
            const favorites = Array.from(JSON.parse(localStorage.getItem('favorites')))
            const idx = getIndex(id, favorites, 'shop_id')

            if (idx != -1)
                this.setState({ like: true })
            else
                this.setState({ like: false })
        }
        this.setState({
            id: id,
            access: access,
            avg: avg,
            drink: drink,
            food: food,
            cap: cap,
            park: park,
            open: open,
            url: url,
            title: title,
            cat: cat,
            img: img,
            dialogOpen: true
        })
    }

    dialogClose = () => {
        this.setState({
            dialogOpen: false
        })
    }

    componentDidMount() {
        this.props.actions.httpRequest()

        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })

            // APIを叩く時のパラメタ
            const params = {
                range: 3,
                order: 4,
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                party_capacity: `${this.props.QuestionsReducer.people}`,
                budget: `${this.props.QuestionsReducer.budget}`,
                free_food: `${this.props.AmountReducer.freeFood}`,
                free_drink: `${this.props.AmountReducer.freeDrink}`,
                genre: `${this.props.QuestionsReducer.genre}`
            };  // セミコロンがないとエラー

            (async () => {
                const res = await requestApi(params)
                this.setState({
                    shops: res.data.results.shop
                })
            })()

            this.props.actions.httpSuccess()
        }, err => {
            this.props.actions.httpFailure()
            console.log(err)
        })
    }
}

const mapStateToProps = state => ({
    QuestionsReducer: state.QuestionsReducer,
    AmountReducer: state.AmountReducer,
    HttpReducer: state.HttpReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

const styledResult = withStyles(styles, { withTheme: true })(Result)

export default connect(mapStateToProps, mapDispatchToProps)(styledResult)
