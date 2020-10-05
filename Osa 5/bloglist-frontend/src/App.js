import React, { useState, useEffect } from 'react'
import AddBlog from './components/AddBlog'
import ExpandableBlog from './components/ExpandableBlog'
import Login from './components/Login'
import Logout from './components/Logout'
import StatusMessage from './components/StatusMessage'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [statusMessage, setStatusMessage] = useState({message: '', isError: false})

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } catch (exception) {
      setStatusMessage({message:'Incorrect username or password', isError: true})
      setTimeout(() => {
        setStatusMessage({message:'', isError: false})
      }, 2000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (exception) {
      setStatusMessage({message:'logout not successful', isError: true})
      setTimeout(() => {
        setStatusMessage({message:'', isError: false})
      }, 2000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setStatusMessage({message: `Successfully added ${blogObject.title} by ${blogObject.author}`, isError: false})
      setTimeout(() => {
        setStatusMessage({message:'', isError: false})
      }, 3000)
    } catch (exception) {
      setStatusMessage({message: 'adding a blog failed', isError: true})
      setTimeout(() => {
        setStatusMessage({message:'', isError: false})
      }, 2000)
    }
  }

  const removeBlog = async (blogToRemove) => {
    try {
      if (window.confirm(`Do you really want to remove ${blogToRemove.title}?`))
        await blogService.remove(blogToRemove.id)
        setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
    } catch (exception) {
      setStatusMessage({message: 'deleting the blog was not successful', isError: true})
      setTimeout(() => {
        setStatusMessage({message:'', isError: false})
      }, 2000)
    }
  }

  const addLike = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update({...blogObject, likes: blogObject.likes+1, user:blogObject.user.id})
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : {...blog, likes: returnedBlog.likes}))
    } catch {
      setStatusMessage({message: 'unable to like', isError: true})
      setTimeout(() => {
        setStatusMessage({message:'', isError: false})
      }, 2000)
    }
  }

  const correctUser = (userInfo) => {
    return user && (user.username === userInfo.username) && (user.name === userInfo.name)
  }

  const credentials = {
    username: {
      text: username, 
      handler: setUsername
    },
    password: {
      text: password,
      handler: setPassword
    }
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <StatusMessage statusMessage={statusMessage}/>
        <Login credentials={credentials} loginHandler={handleLogin} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <StatusMessage statusMessage={statusMessage}/>
      <Logout name={user.name} logoutHandler={handleLogout}/>
      <Togglable buttonLabel="new blog">
        <AddBlog addBlog={addBlog} />
      </Togglable>
      {blogs.sort((a,b) => b.likes-a.likes).map((blog, i) =>
        <ExpandableBlog key={i} blog={blog} userCheck={correctUser} addLike={addLike} removeBlog={removeBlog}/>
      )}
    </div>
  )
}

export default App