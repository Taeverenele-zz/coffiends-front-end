describe('Test Cafe User Can login', () => {
    it('Visits the Coffiends', () => {

      cy.intercept(`http://localhost:5000/users/login`, {fixture: "cafe_user.json"}).as("cafeuser")
      cy.intercept(`http://localhost:5000/cafes/1/orders`, {fixture: "Current_Orders.json"}).as("orders")
      cy.intercept(`http://localhost:5000/cafes/1/orders/past`, {fixture: "Current_Orders.json"}).as("orders")

      cy.visit('http://localhost:3000')
      cy.get('input[name=username]').type('cafe@coffiends.com')
      cy.get('input[name=password]').type('password')
      cy.contains("LOG IN").click()
      cy.wait("@cafeuser")
    })
  })