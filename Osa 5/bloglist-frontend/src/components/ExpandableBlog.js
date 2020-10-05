import React, { useState } from 'react'

const RemoveButton = ({ userCheck, blog, removeBlog }) => {
  if (userCheck({ username: blog.user.username, name: blog.user.name })) {
    return (
      <button onClick={() => removeBlog(blog)}>remove</button>
    )
  } else {
    return (
      null
    )
  }
}

const ExpandableBlog = ({ blog, userCheck, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ? 'none' : '',
    border: 'solid',
    borderWidth: 1
  }
  const showWhenVisible = {
    display: visible ? '' : 'none',
    border: 'solid',
    borderWidth: 1
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <div>{blog.title} {blog.author}<button onClick={toggleVisibility}>view</button></div>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button onClick={() => addLike(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        <RemoveButton blog={blog} userCheck={userCheck} removeBlog={removeBlog}/>
      </div>
    </div>
  )
}

export default ExpandableBlog