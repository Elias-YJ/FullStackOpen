import React from 'react'
const Logout = (({ name, logoutHandler }) => {
  return (
    <div>
      <p>{name} logged in <button onClick={logoutHandler}>logout</button> </p>
    </div>
  )
})
export default Logout