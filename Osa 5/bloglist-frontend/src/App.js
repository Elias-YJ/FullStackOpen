import React, { useState, useEffect } from 'react'
import AddBlog from './components/AddBlog'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import StatusMessage from './components/StatusMessage'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '', author: '', url: ''})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [statusMessage, setStatusMessage] = useState({message: '', isError: false})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(JSON.stringify(user))

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

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const addedBlog = newBlog
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setNewBlog({
        title: "",
        author: "",
        url: ""
      })
      setStatusMessage({message: `Successfully added ${addedBlog.title} by ${addedBlog.author}`, isError: false})
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

  const handleBlogChange = (changedProperty) => {
      setNewBlog({...newBlog, ...changedProperty})
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
      <AddBlog blog={newBlog} addHandler={handleAddBlog} changeHandler={handleBlogChange}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App