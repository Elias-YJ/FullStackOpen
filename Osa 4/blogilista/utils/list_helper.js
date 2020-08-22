const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.lenght === 0  
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const max = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  return max
}

const mostBlogs = (blogs) => {
  const counts = lodash.countBy(blogs, 'author')
  let formattedCounts = []
  for (var author in counts){
    const newEntry = 
    {
      author: author,
      blogs: counts[author]
    }
    formattedCounts = [...formattedCounts, newEntry]
  }
  const max = formattedCounts.reduce((prev, current) => (prev.blogs > current.blogs) ? prev : current)
  return max
}

const mostLikes = (blogs) => {
  const likeList = lodash.groupBy(blogs, 'author')
  const sumReducer = (sum, blog) => {
    return sum + blog.likes}
  let formattedLikes = []
  for (var author in likeList){
    const newEntry = 
    {
      author: author,
      likes: likeList[author].reduce(sumReducer, 0)
    }
    formattedLikes = [...formattedLikes, newEntry]
  }
  const max = formattedLikes.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  return max

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}