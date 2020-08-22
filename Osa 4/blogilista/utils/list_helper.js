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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}