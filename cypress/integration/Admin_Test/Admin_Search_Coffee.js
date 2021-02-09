describe('Test Admin User Can search Coffee', () => {
    it('Visits the Coffiends', () => {
      cy.visit('https://coffiends.herokuapp.com/')
      cy.get('input[name=username]').type('admin@coffiends.com')
      cy.get('input[name=password]').type('password{enter}')
      cy.wait(2000)
      cy.get('input[type="text"]').eq(1).type('Flat White')
    })
  })