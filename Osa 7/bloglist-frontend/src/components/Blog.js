import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Container, Button } from 'react-bootstrap'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false)
  const label = visible ? 'hide' : 'view'

  return (
    <Container>
      <h2>
        {blog.title}
      </h2>
      <div>
        by {blog.author}
      </div>
      <Link>{blog.url}</Link>
      <br />
      <div>likes {blog.likes}
        <Button onClick={() => handleLike(blog.id)}>like</Button>
      </div>
      <div>{blog.user.name}</div>
      {own&&<Button onClick={() => handleRemove(blog.id)}>remove</Button>}
    </Container>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog