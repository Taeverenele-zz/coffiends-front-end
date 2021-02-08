describe('Test User Can login', () => {
    it('Visits the Coffiends', () => {
      cy.visit('https://coffiends.herokuapp.com/')
      cy.get('input[name=username]').type('user@coffiends.com')
      cy.get('input[name=password]').type('password{enter}')
    })
  })