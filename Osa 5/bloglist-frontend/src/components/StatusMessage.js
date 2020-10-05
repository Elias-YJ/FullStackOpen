import React from 'react'
const StatusMessage = (({ statusMessage }) => {
  if (statusMessage.message.length===0) {
    return null
  } else if (statusMessage.isError) {
    return (
      <div className="error">
        {statusMessage.message}
      </div>
    )
  } else {
    return (
      <div className="success">
        {statusMessage.message}
      </div>
    )
  }
})
export default StatusMessage