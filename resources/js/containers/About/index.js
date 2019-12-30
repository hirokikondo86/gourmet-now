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
    subTtl:{
        fontWeight: 'normal'
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
                                <li>AWS Amplify</li>
                                <li>ホットペッパーグルメ API・Google Maps API</li>
                                <li>React・Redux・Material-UI・Laravel</li>
                            </ul>
                        </div>
                    </Paper>
                    <Paper className={classes.root} elevation={1}>
                        <h3 className={classes.subTtl}>
                            ソース・説明など
                        </h3>
                        <p className={classes.paragraph}>
                            ソース：
                            <a className={classes.link} href="https://github.com/hirokikondo86/gourmet-now" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </p>
                        <p className={classes.paragraph}>
                            説明：
                            <a className={classes.link} href="https://qiita.com/hirokikondo86" target="_blank" rel="noopener noreferrer">   {/* TODO: Qiitaの記事リンク */}
                                こちらで作り方解説
                            </a>
                        </p>
                    </Paper>

                    <Paper className={classes.root} elevation={1}>
                        <h3 className={classes.subTtl}>
                            自己紹介
                        </h3>
                        <p className={classes.paragraph}>
                            <a className={classes.link} href="https://twitter.com/KHiroki86_" target="_blank" rel="noopener noreferrer">
                                @MuscleEngineer_
                            </a>
                        </p>
                        <p>
                            Works：株式会社Combz Programmer / TechKids Mentor
                        </p>
                        <p className={classes.paragraph}>
                            プログラミングを始めたばかりのIT系専門学校生。スポーツとモノを作る事が好き。
                        </p>
                        <p className={classes.paragraph}>
                            Go、React、Laravel辺りを好んでやっています。
                            <a className={classes.link} href="https://qiita.com/hirokikondo86" target="_blank" rel="noopener noreferrer">
                                Qiita
                            </a>
                            でも記事投稿を始めましたので是非お遊びにいらして下さい。
                        </p>
                        <p className={classes.paragraph}>
                            ご指摘・ご質問などは、
                            <a className={classes.link} href="https://twitter.com/MuscleEngineer_" target="_blank" rel="noopener noreferrer">
                                Twitter
                            </a>
                            もしくは
                            <a className={classes.link} href="mailto:$kondo.h.0806@gmail.com" target="_blank" rel="noopener noreferrer">
                                メール
                            </a>
                            よりご連絡下さい。
                        </p>
                        <p className={classes.about}>※ 当アプリはジョークアプリとしてご利用下さい。</p>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(About)