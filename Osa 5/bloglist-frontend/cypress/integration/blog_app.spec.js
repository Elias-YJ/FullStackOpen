const { hasUncaughtExceptionCaptureCallback } = require("process")
const { func } = require("prop-types")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Log in to application')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('kappa')
      cy.get('#login-button').click()

      cy.contains('Incorrect')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Mato Matalan seikkailut')
      cy.get('#author-input').type('Richard Scarry')
      cy.get('#url-input').type('www.richardscarry.com')
      cy.get('#create-blog').click()

      cy.contains('Mato Matalan seikkailut Richard Scarry')
    })

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.login({ username: 'mluukkai', password: 'salainen' })
        cy.createBlog({ 
          title:'Mato Matalan seikkailut', 
          author:'Richard Scarry', 
          url:'www.richardscarry.com'
        })
        cy.createBlog({ 
          title:'Jukan vaalipeli', 
          author:'Martti Ahtisaari', 
          url:'www.presidentti.fi'
        })
      })
      it('A blog can be liked', function() {
        cy.contains('Jukan vaalipeli')
          .contains('view').click()

        cy.contains('Jukan vaalipeli').parent().parent().find('#likes').as('likeContainer').find('button').click()
      })
      it('A blog can be removed', function() {
        cy.server();

        cy.route({
          method: "DELETE",
          url: '**/blogs/**'
        }).as("route_delete")

        cy.contains('Mato Matalan seikkailu')
          .contains('view').click()

        cy.contains('Mato Matalan seikkailu').parent().parent().contains('remove').click()
        cy.wait('@route_delete')
        cy.get('.togglableContent')
        .then( blogs => {
          expect(blogs).to.have.length(1)
        })
      })
    })
  })
})