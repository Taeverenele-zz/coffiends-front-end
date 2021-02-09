describe('Test Cafe User can see orders', () => {
    it('Visits the Coffiends', () => {
      cy.visit('https://coffiends.herokuapp.com/')
      cy.get('input[name=username]').type('cafe@coffiends.com')
      cy.get('input[name=password]').type('password{enter}')
      cy.wait(2000)
      cy.get('.Cafe-Dashboard-Expand').click()
      cy.wait(2000)
    })
  })