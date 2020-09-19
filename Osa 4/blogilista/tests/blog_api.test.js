const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const extraBlog = { 
  _id: "5a422bc61b54a676234d17fc", 
  title: "Huutimateriaali", 
  author: "Robert C. Martingaali", 
  url: "http://blog.cleancoder.com/uncle-bob/2016/06/01/TypeWars.html", 
  likes: 100, 
  __v: 0 
}

const noLikesBlog = { 
  _id: "5a422b891b54a676234d17fa", 
  title: "No likes", 
  author: "Bad Writer", 
  url: "http://blog.cleancoder.com/uncle-bob/",  
  __v: 0 
}

const noTitleBlog = { 
  _id: "5a422bc61b54a676234d17fc", 
  author: "Titleless Martin", 
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
  likes: 2, 
  __v: 0 
}

const noUrlBlog = { 
  _id: "5a422bc61b54a676234d17fc", 
  title: "Where to find me ?", 
  author: "Robert C. Martin", 
  likes: 2, 
  __v: 0 
}

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('When there are initially some blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are found', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have id field', async () => {
    const response = await api.get('/api/blogs')
    var blog;
    for (blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })

  describe('Adding new blogs', () => {
    test('blogs can be added', async () => {
      const usersAtStart = await helper.usersInDb()
      await api
        .post('/api/blogs')
        .send({
          userId: usersAtStart[0].id,
          ...extraBlog
        })
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
      expect(blogsAtEnd[helper.initialBlogs.length].title).toBe(extraBlog.title)
    })

    test('blogs with no likes can be added', async () => {
      const usersAtStart = await helper.usersInDb()
      await api
        .post('/api/blogs')
        .send({
          userId: usersAtStart[0].id,
          ...noLikesBlog
        })
        .expect(201)
        .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
      expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
    })

    test('blogs with no title cannot be added', async () => {
      const usersAtStart = await helper.usersInDb()
      await api
        .post('/api/blogs')
        .send({
          userId: usersAtStart[0].id,
          ...noTitleBlog})
        .expect(400)
        const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('blogs with no url cannot be added', async () => {
      const usersAtStart = await helper.usersInDb()
      await api
        .post('/api/blogs')
        .send({
          userId: usersAtStart[0].id,
          ...noUrlBlog
        })
        .expect(400)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })
  describe('Deleting a blog', () => {
    test('blog can be deleted', async () => {
      const initialResponse = await api.get('/api/blogs')
      const firstBlog = initialResponse.body[0]
      await api
        .delete(`/api/blogs/${firstBlog.id}`)
        .expect(204)
        const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)
    })
  })
  describe('Updating a blog', () => {
    test('blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const firstBlog = blogsAtStart[0]
      await api
        .put(`/api/blogs/${firstBlog.id}`)
        .send({...firstBlog, likes:1000})
        .expect(200)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[0].likes).toBe(1000)
    })
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  describe('Username and password must fill criteria', () => {
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }),

    test('creation fails if username or password is missing', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser1 = {
        name: 'Superuser',
        password: 'salainen'
      }

      const newUser2 = {
        username: 'mikko',
        name: 'Superuser'
      }

      const result1 = await api
        .post('/api/users')
        .send(newUser1)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const result2 = await api
        .post('/api/users')
        .send(newUser2)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result1.body.error).toContain('content missing')
      expect(result2.body.error).toContain('content missing')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    }),

    test('creation fails if username or password are too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser1 = {
        username: 'mikko',
        name: 'Superuser',
        password: 'sa'
      }

      const newUser2 = {
        username: 'mi',
        name: 'Superuser',
        password: 'salainen'
      }

      const result1 = await api
        .post('/api/users')
        .send(newUser1)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const result2 = await api
        .post('/api/users')
        .send(newUser2)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result1.body.error).toContain('must be at least')
      expect(result2.body.error).toContain('must be at least')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})


afterAll(() => {
  mongoose.connection.close()
})