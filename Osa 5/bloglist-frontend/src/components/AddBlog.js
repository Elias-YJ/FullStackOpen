import React from 'react'

const Title = ({ title, changeHandler }) => (
  <div>
    title:
      <input
      type="text"
      value={title}
      name="title"
      onChange={({ target }) => changeHandler({title: target.value})}
    />
  </div>
)

const Author = ({ author, changeHandler }) => (
  <div>
    author:
      <input
      type="text"
      value={author}
      name="author"
      onChange={({ target }) => changeHandler({author: target.value})}
    />
  </div>
)

const Url = ({ url, changeHandler }) => (
  <div>
    url:
      <input
      type="text"
      value={url}
      name="url"
      onChange={({ target }) => changeHandler({url: target.value})}
    />
  </div>
)

const AddBlog = (({blog, addHandler, changeHandler}) => {

  return (
    <form onSubmit={addHandler} method='post'>
        <Title title={blog.title} changeHandler={changeHandler}/>
        <Author author={blog.author} changeHandler={changeHandler}/>
        <Url url={blog.url} changeHandler={changeHandler}/>
        <button type="submit">create</button>
    </form>
  )
})
export default AddBlog