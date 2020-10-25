import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if ( !notification ) {
      setShow(false)
    } else {
      setShow(true)
    }
  },[notification])

  if ( !notification ) {
    return null
  }

  if (show){
    const variant = notification.type === 'success' ? 'success' : 'danger'
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{notification.message.heading}</Alert.Heading>
        <p>
          {notification.message.body}
        </p>
      </Alert>
    )
  } else {
    return null
  }
}

export default Notification