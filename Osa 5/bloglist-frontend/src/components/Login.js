import React from 'react'

const Username = ({ username, changeHandler }) => (
  <div>
    username
      <input
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
        <button type="submit">login</button>
    </form>
  )
})
export default Login