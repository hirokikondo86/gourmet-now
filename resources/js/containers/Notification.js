import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'

// コンポーネントの準備
import NotificationSnackbar from '../components/NotificationSnackbar'

// Redux関連
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

// スタイル
const styles = () => ({
    root: {
        margin: 10,
    },
})

class Notification extends React.Component {

    render() {

        // redux関連
        const { NotificationReducer, actions } = this.props

        // Material-ui関連
        const { classes } = this.props


        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={NotificationReducer.notificationOpen}
                autoHideDuration={3000}
                onClose={actions.closeNotification}
                className={classes.root}
            >
                <NotificationSnackbar
                    onClose={actions.closeNotification}
                    variant={NotificationReducer.variant}
                    message={NotificationReducer.message}
                />
            </Snackbar>
        )
    }
}

const mapState = state => ({
    NotificationReducer: state.NotificationReducer
})

const mapDispatch = dispatch => ({
    actions: bindActionCreators(actions, dispatch) // Actionを自動的にマッピング
})

const StyledNotification = withStyles(styles, { withTheme: true })(Notification)

export default connect(mapState, mapDispatch)(StyledNotification)