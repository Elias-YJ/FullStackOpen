import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Collapse, Button } from 'react-bootstrap'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false)
  const label = visible ? 'hide' : 'view'

  return (
    <tr className='blog' key={blog.id}>
      <td>
        <i>{blog.title}</i>
        <Collapse in={visible}>
          <div>
            <div>{blog.url}</div>
            <div>likes {blog.likes}
              <button onClick={() => handleLike(blog.id)}>like</button>
            </div>
            <div>{blog.user.name}</div>
            {own&&<button onClick={() => handleRemove(blog.id)}>remove</button>}
          </div>
        </Collapse>
      </td>
      <td>
      by {blog.author}
      </td>
      <td>
        <Button onClick={() => setVisible(!visible)}>{label}</Button>
      </td>
    </tr>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog