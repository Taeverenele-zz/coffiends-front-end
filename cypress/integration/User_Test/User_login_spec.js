describe('Test User Can login', () => {
    it('Visits the Coffiends', () => {
      cy.intercept(`http://localhost:5000/users/login`, {fixture: "user.json"}).as("loginUser")
      cy.visit('http://localhost:3000')
      cy.get('input[name=username]').type('user@coffiends.com')
      cy.get('input[name=password]').type('password{enter}')
      cy.wait("@loginUser")
    })
  })