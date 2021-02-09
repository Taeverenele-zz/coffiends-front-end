describe('Test User Can login', () => {
    it('Visits the Coffiends', () => {
      cy.visit('https://coffiends.herokuapp.com/')
      cy.get('input[name=username]').type('cafe@coffiends.com')
      cy.get('input[name=password]').type('password{enter}')
      cy.wait(3000)
      cy.get(':nth-child(2) > a > .button-color').click() 
    })
  })