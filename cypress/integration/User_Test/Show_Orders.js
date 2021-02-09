describe('User can see their current order', () => {
    it('Visits the Coffiends', () => {
        cy.intercept(`http://localhost:5000/users/login`, {fixture: "user.json"}).as("loginUser")
        cy.intercept(`http://localhost:5000/users/1/orders`, {fixture: "Current_Orders.json" }).as("current_orders")
        cy.intercept(`http://localhost:5000/users/1/orders/past`, {fixture: "Past_Orders.json" }).as("past_orders")
        
        cy.visit('http://localhost:3000')
        cy.get('input[name=username]').type('user@coffiends.com')
        cy.get('input[name=password]').type('password')
        cy.contains("LOG IN").click()
        cy.wait("@loginUser")
        cy.contains("ORDERS").click()
        cy.wait("@current_orders")
    })
  })
