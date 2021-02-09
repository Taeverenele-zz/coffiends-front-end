describe('Home Page can populate', () => {
    it('Visits the Coffiends', () => {
      cy.intercept(`http://localhost:5000/users/login`, {fixture: "user.json"}).as("loginUser")
      cy.intercept(`http://localhost:5000/coffees/`, {fixture: "coffees.json"}).as("coffees")

      cy.visit('http://localhost:3000')
      cy.get('input[name=username]').type('user@coffiends.com')
      cy.get('input[name=password]').type('password{enter}')
      cy.wait("@loginUser")
      cy.wait("@coffees")
    
    })
  })