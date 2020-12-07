import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ListBlog = ({ blog }) => {
  return (
    <tr className='blog' key={blog.id}>
      <td>
        <Link to={'/blogs/'+blog.id}>
          {blog.title}
        </Link>
      </td>
      <td>
      by {blog.author}
      </td>
    </tr>
  )
}

ListBlog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default ListBlog