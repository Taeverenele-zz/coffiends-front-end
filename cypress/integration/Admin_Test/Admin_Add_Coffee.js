describe('Test Admin User Can add Coffee', () => {
    it('Visits the Coffiends', () => {
      cy.visit('https://coffiends.herokuapp.com/')
      cy.get('input[name=username]').type('admin@coffiends.com')
      cy.get('input[name=password]').type('password{enter}')
      cy.wait(2000)
      cy.get('.btn').contains("ADD COFFEE").click()
      cy.get('input[name="name"]').type('Test Coffee')
      cy.get('input[name="description"]').type('Test Coffee Description')
      cy.get('.btn').contains("Submit").click()
      cy.wait(2000)
    
    })
  })