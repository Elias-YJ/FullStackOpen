import React from 'react'
import PropTypes from 'prop-types'

const Username = ({ username, changeHandler }) => (
  <div>
    username
    <input
      id="username"
      type="text"
      value={username}
      name="Username"
      onChange={({ target }) => changeHandler(target.value)}
    />
  </div>
)

const Password = ({ password, changeHandler }) => (
  <div>
    password
    <input
      id="password"
      type="password"
      value={password}
      name="Password"
      onChange={({ target }) => changeHandler(target.value)}
    />
  </div>
)

const Login = (({ credentials, loginHandler }) => {
  return(
    <form onSubmit={loginHandler} method='post'>
      <Username username={credentials.username.text} changeHandler={credentials.username.handler}/>
      <Password password={credentials.password.text} changeHandler={credentials.password.handler}/>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  )
})

Login.propTypes = {
  credentials: PropTypes.object.isRequired,
  loginHandler: PropTypes.func.isRequired
}

export default Login