import React, { useState } from 'react'

const Title = ({ title, changeHandler }) => (
  <div>
    title:
    <input
      className="title"
      type="text"
      value={title}
      name="title"
      onChange={({ target }) => changeHandler({ title: target.value })}
    />
  </div>
)

const Author = ({ author, changeHandler }) => (
  <div>
    author:
    <input
      className="author"
      type="text"
      value={author}
      name="author"
      onChange={({ target }) => changeHandler({ author: target.value })}
    />
  </div>
)

const Url = ({ url, changeHandler }) => (
  <div>
    url:
    <input
      className="url"
      type="text"
      value={url}
      name="url"
      onChange={({ target }) => changeHandler({ url: target.value })}
    />
  </div>
)

const AddBlog = (({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleAddBlog = async (event) => {
    event.preventDefault()
    addBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  const handleBlogChange = (changedProperty) => {
    setNewBlog({ ...newBlog, ...changedProperty })
  }

  return (
    <form onSubmit={handleAddBlog} method='post'>
      <Title title={newBlog.title} changeHandler={handleBlogChange}/>
      <Author author={newBlog.author} changeHandler={handleBlogChange}/>
      <Url url={newBlog.url} changeHandler={handleBlogChange}/>
      <button type="submit">create</button>
    </form>
  )
})
export default AddBlog