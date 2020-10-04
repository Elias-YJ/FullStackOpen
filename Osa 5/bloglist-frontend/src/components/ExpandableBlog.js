import React, { useState } from 'react'

const ExpandableBlog = ({ blog }) => {
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

  const addLike = () => {
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <div>{blog.title} {blog.author}<button onClick={toggleVisibility}>view</button></div>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button onClick={addLike}>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default ExpandableBlog