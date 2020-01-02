import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const drawerWidth = 250 // Width for Drawer

const styles = (theme) => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: 10,
        paddingBottom: 10,
        margin: 20,
    },
    paragraph: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12
    },
    content: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        },
        padding: 30
    },
    toolbar: theme.mixins.toolbar, // Toolbarの最小の高さ
    title: {
        textAlign: 'center',
        fontWeight: 'normal',
    },
    subTtl: {
        fontWeight: 'bold',
        marginBottom: 0
    },
    link: {
        textDecoration: 'none'
    },
    about: {
        color: 'red',
        fontSize: 10,
    }
})

class About extends React.Component {

    render() {

        // Material-ui関連
        const { classes } = this.props;

        return (
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <h2 className={classes.title}>About</h2>
                <div>
                    <Paper className={classes.root} elevation={1}>
                        <h3 className={classes.subTtl}>
                            ぐるめなう とは
                        </h3>
                        <p className={classes.paragraph}>
                            あなたの「なう」に合わせた飲食店をご紹介致します。
                        </p>
                    </Paper>
                    <Paper className={classes.root} elevation={1}>
                        <h3 className={classes.subTtl}>
                            構成要素
                        </h3>
                        <p className={classes.paragraph}>
                            本アプリでは下記技術を用いており、各サービスの仕様変更ならびに障害発生時には、本アプリの提供・公開を中断する場合もございます。予めご了承下さい。
                        </p>
                        <div className={classes.paragraph}>
                            <ul>
                                <li>フロントエンド：
                                    <ul>
                                        <li>React</li>
                                        <li>Redux</li>
                                        <li>Material-UI</li>
                                    </ul>
                                </li>
                                <li>バックエンド：
                                    <ul>
                                        <li>Laravel</li>
                                    </ul>
                                </li>
                                <li>クラウド：
                                    <ul>
                                        <li>AWS</li>
                                    </ul>
                                </li>
                                <li>Web API：
                                    <ul>
                                        <li>Google Maps</li>
                                        <li>ホットペッパーグルメ</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </Paper>

                    <Paper className={classes.root} elevation={1}>
                        <h3 className={classes.subTtl}>
                            プロフィール
                        </h3>
                        <h4 className={classes.subTtl}>Works：</h4>
                        <p className={classes.paragraph}>株式会社Combz Programmer</p>
                        <p className={classes.paragraph}>株式会社サイバーエージェント TechKids School Mentor</p>
                        <h4 className={classes.subTtl}>自己紹介：</h4>
                        <p className={classes.paragraph}>
                            IT系専門学校HAL大阪の２回生。
                        </p>
                        <p className={classes.paragraph}>
                            React, TypeScript, Kotlin辺りを好んでやっています。
                            現状、フロントエンド寄りですが、AWSやDocker等のインフラ周りやKotlin（サーバーサイド）などにも興味があり、フロントエンド・バックエンド関係なく技術を楽しんでいます。
                        </p>
                        <h4 className={classes.subTtl}>趣味：</h4>
                        <p className={classes.paragraph}>
                            筋トレ、NBA観戦、プログラミング
                        </p>
                        <p className={classes.paragraph}>
                            ご指摘・ご質問などは、
                            <a className={classes.link} href="https://twitter.com/KHiroki86_" target="_blank" rel="noopener noreferrer">
                                Twitter
                            </a>
                            もしくは
                            <a className={classes.link} href="mailto:$kondo.h.0806@gmail.com" target="_blank" rel="noopener noreferrer">
                                メール
                            </a>
                            よりご連絡下さい。
                        </p>
                    </Paper>
                    <Paper className={classes.root} elevation={1}>
                        <h3 className={classes.subTtl}>
                            リンク
                        </h3>
                        <p className={classes.paragraph}>
                            <a className={classes.link} href="https://github.com/hirokikondo86/gourmet-now" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </p>
                        <p className={classes.paragraph}>
                            <a className={classes.link} href="https://twitter.com/KHiroki86_" target="_blank" rel="noopener noreferrer">
                                Twitter
                            </a>
                        </p>
                        <p className={classes.paragraph}>
                            <a className={classes.link} href="https://www.wantedly.com/users/125221850" target="_blank" rel="noopener noreferrer">
                                Wantedly
                            </a>
                        </p>
                        <p className={classes.about}>
                            ※ 当アプリはジョークアプリとしてご利用下さい。<br />
                            ※ 当アプリを使用した如何なる損害やトラブルの責任は一切負いかねますので予めご了承ください。
                        </p>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(About)