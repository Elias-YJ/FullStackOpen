import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Table, Button, Navbar, NavbarBrand, NavLink, Nav } from 'react-bootstrap'
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Navigation from './components/Navigation'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

import { setNotification } from './reducers/notificationReducer'
import { loginUser, logoutUser } from './reducers/userReducer'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    props.loginUser(user)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      props.loginUser(user)
      props.setNotification('Hi', `Welcome back ${user.name}`, 'success', 5)
      storage.saveUser(user)
    } catch(exception) {
      props.setNotification('Wrong username/password', 'Please try again', 'error', 5)
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      props.setNotification('New blog!', `${newBlog.title} by ${newBlog.author} was added.`, 'success', 5)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    setBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const handleLogout = () => {
    props.logoutUser()
    storage.logoutUser()
  }

  if ( !props.user ) {
    return (
      <Container>
        <h2>Login to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button id='login' type="submit">login</Button>
        </form>
      </Container>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <Container>
      <Navigation handleLogout={handleLogout}/>
      <Notification />
      <br />
      <Switch>
        <Route path='/blogs'>
          <Togglable buttonLabel='Create new blog'  ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          <Table hover>
            <tbody>
              {blogs.sort(byLikes).map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLike={handleLike}
                  handleRemove={handleRemove}
                  own={props.user.username===blog.user.username}
                />
              )}
            </tbody>
          </Table>
        </Route>
        <Route path='/users'>
          <h2>Users</h2>
        </Route>
        <Route path='/'>
          <Redirect to='/blogs' />
        </Route>
      </Switch>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  { setNotification, loginUser, logoutUser },
)(App)

export default ConnectedApp
