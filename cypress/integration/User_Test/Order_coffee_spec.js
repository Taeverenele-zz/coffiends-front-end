describe('Test User Can login', () => {
    it('Visits the Coffiends', () => {
      cy.visit('https://coffiends.herokuapp.com/')
      cy.get('input[name=username]').type('user@coffiends.com')
      cy.get('input[name=password]').type('password{enter}')
      cy.wait(3000)
      cy.get('.btn').contains('SEARCH').click({force: true}) 
      cy.wait(3000)
      cy.get('.leaflet-marker-icon').first().click() 
      cy.get('.btn-info').first().click()
      cy.get('.btn').contains('CHECKOUT').click() 

    })
  })