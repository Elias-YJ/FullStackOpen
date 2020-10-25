import React, { useState, useEffect } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({
      message, type
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      setUser(user)
      notifyWith(
        {
          heading: 'Hi!',
          body: `Welcome back ${user.name}!`
        })
      storage.saveUser(user)
    } catch(exception) {
      notifyWith(
        {
          heading: 'wrong username/password',
          body: 'Please try again'
        }, 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      notifyWith(
        {
          heading: 'New blog!',
          body: `${newBlog.title} by ${newBlog.author} was added.`
        })
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
    setUser(null)
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <Container>
        <h2>Login to application</h2>
        <Notification notification={notification} />
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
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in <Button onClick={handleLogout}>logout</Button>
      </p>

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
              own={user.username===blog.user.username}
            />
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default App