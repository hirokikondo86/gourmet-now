import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Lottie from "react-lottie"
import animationData from "../lottie/loading.json"

const styles = () => ({
    root: {
    },
    dialog: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    circle: {
        width: 50
    },
    txt: {
        fontWeight: 'bold',
        margin: 0,
        marginBottom: 5
    }
})

class LoadingDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mail: '',
            pass: '',
        }
    }

    render() {
        const { classes } = this.props
        const { HttpReducer } = this.props
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
                <Dialog
                    open={HttpReducer.isRequesting}
                >
                    <DialogContent className={classes.dialog}>
                        <Lottie options={defaultOptions} height={70} width={70} />
                        <p className={classes.txt}>Loading...</p>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    HttpReducer: state.HttpReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch) // Actionを自動的にマッピング
})

const StyledLoadingDialog = withStyles(styles, { withTheme: true })(LoadingDialog)

export default connect(mapStateToProps, mapDispatchToProps)(StyledLoadingDialog)