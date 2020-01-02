import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import ShareIcon from '@material-ui/icons/Share'


// SNS用シェアボタン
import {
    FacebookShareButton,
    TwitterShareButton,
    LineShareButton,
    TumblrShareButton,
    InstapaperShareButton,
    EmailShareButton,

    FacebookIcon,
    TwitterIcon,
    LineIcon,
    TumblrIcon,
    InstapaperIcon,
    EmailIcon,
} from 'react-share'

// クリップボードにコピー
import { CopyToClipboard } from 'react-copy-to-clipboard'

// Redux関連
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'

// スタイル
const styles = () => ({
    snsShareButtonArea: {
        padding: 10,
        display: 'flex',
        justifyContent: 'space-around',
    },
    shareIcon: {
        color: 'white'
    }
})


class ShareDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shareDialogOpen: false,
        }
        this.shareDialogToggle = this.shareDialogToggle.bind(this)
    }

    shareDialogToggle() {
        this.setState({ shareDialogOpen: !this.state.shareDialogOpen })
    }

    render() {

        // redux関連
        const { actions } = this.props

        // Material-ui関連
        const { classes } = this.props

        // シェアボタン用
        const shareUrl = "https://gourmet-now.site"
        const title = "グルメなう【あなたの「なう」に合わせてお店をご提案】"

        return (
            <div>
                <IconButton
                    aria-label="Open Share"
                    onClick={this.shareDialogToggle}
                    className={classes.shareIcon}
                >
                    <Typography variant="button" noWrap>
                        <ShareIcon />
                    </Typography>
                </IconButton>
                <Dialog
                    open={this.state.shareDialogOpen}
                    onClose={this.shareDialogToggle}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>グルメなうをシェア</DialogTitle>
                    <Divider />
                    <DialogContent className={classes.snsShareButtonArea}>
                        <FacebookShareButton
                            url={shareUrl}
                            quote={title}
                            className={classes.snsShareButton}>
                            <FacebookIcon
                                size={48}
                                round />
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={shareUrl}
                            title={title}
                            hashtag="グルメなう"
                            className={classes.snsShareButton}>
                            <TwitterIcon
                                size={48}
                                round />
                        </TwitterShareButton>
                        <LineShareButton
                            url={shareUrl}
                            subject={title}
                            body="body"
                            className={classes.snsShareButton}>
                            <LineIcon
                                size={48}
                                round />
                        </LineShareButton>
                    </DialogContent>
                    <DialogContent className={classes.snsShareButtonArea}>
                        <InstapaperShareButton
                            url={shareUrl}
                            title={title}
                            windowWidth={750}
                            windowHeight={600}
                        >
                            <InstapaperIcon
                                size={48}
                                round />
                        </InstapaperShareButton>
                        <TumblrShareButton
                            url={shareUrl}
                            title={title}
                            windowWidth={660}
                            windowHeight={460}
                        >
                            <TumblrIcon
                                size={48}
                                round />
                        </TumblrShareButton>
                        <EmailShareButton
                            url={shareUrl}
                            title={title}
                            windowWidth={660}
                            windowHeight={460}
                        >
                            <EmailIcon
                                size={48}
                                round />
                        </EmailShareButton>
                    </DialogContent>
                    <DialogContent className={classes.snsShareButtonArea}>
                        <CopyToClipboard text={shareUrl}

                            onCopy={() => actions.setNotification('success', 'クリップボードにコピーしました')}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                            >
                                URLをコピー
                            </Button>
                        </CopyToClipboard>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button onClick={this.shareDialogToggle} color="primary" autoFocus>
                            閉じる
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
})

const StyledShareDialog = withStyles(styles, { withTheme: true })(ShareDialog)

export default connect(null, mapDispatchToProps)(StyledShareDialog);