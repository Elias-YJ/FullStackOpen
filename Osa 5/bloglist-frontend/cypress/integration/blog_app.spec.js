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

      cy.contains('blogs')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('kappa')
      cy.get('#login-button').click()

      cy.contains('Incorrect')
    })
  })
})