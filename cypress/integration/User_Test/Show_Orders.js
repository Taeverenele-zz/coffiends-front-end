describe('Test User Can login', () => {
    it('Visits the Coffiends', () => {
        cy.intercept(`http://localhost:5000/users/login`, {fixture: "user.json"}).as("loginUser")
        cy.intercept("route", {fixture: })
        cy.visit('http://localhost:3000')
        cy.get('input[name=username]').type('user@coffiends.com')
        cy.get('input[name=password]').type('password')
        cy.contains("LOG IN").click()
        cy.wait("@loginUser")
        cy.contains("ORDERS").click()
        cy.get('.Cafe-Dashboard-Expand').click()
    })
  })


