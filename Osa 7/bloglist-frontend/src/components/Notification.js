import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { setNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const variant = props.notification.alertType === 'success' ? 'success' : 'danger'
  return (
    <Alert variant={variant} style={{ display: props.notification.content.length===0 ? 'none' : '' }} onClose={() => setNotification('', '', '', null)} dismissible>
      <Alert.Heading>{props.notification.heading}</Alert.Heading>
      <p>
        {props.notification.content}
      </p>
    </Alert>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
