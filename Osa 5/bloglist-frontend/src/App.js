import React, { useState, useEffect } from 'react'
import AddBlog from './components/AddBlog'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: ""
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } catch (exception) {
      //setErrorMessage('wrong credentials')
      //setTimeout(() => {
      //  setErrorMessage(null)
      //}, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (exception) {
      //setErrorMessage('logout not successful')
      //setTimeout(() => {
      //  setErrorMessage(null)
      //}, 5000)
    }
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      console.log('creating')
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setNewBlog({
        title: "",
        author: "",
        url: ""
      })
    } catch (exception) {
      console.log('error')
      console.log(JSON.stringify(exception))
      //setErrorMessage('adding a blog failed')
      //setTimeout(() => {
      //  setErrorMessage(null)
      //}, 5000)
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
        <Login credentials={credentials} loginHandler={handleLogin} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Logout name={user.name} logoutHandler={handleLogout}/>
      <AddBlog blog={newBlog} addHandler={handleAddBlog} changeHandler={handleBlogChange}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App