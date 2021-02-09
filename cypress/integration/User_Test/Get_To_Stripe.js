describe('User can get to stripe payment', () => {
    it('Visits the Coffiends', () => {
       
        cy.visit('http://localhost:3000')
        cy.get('input[name=username]').type('user@coffiends.com')
        cy.get('input[name=password]').type('password')
        cy.contains("LOG IN").click()
        cy.wait(2000)
        cy.get('.btn').contains('SEARCH').eq(0).click({force: true})
        cy.get('.leaflet-marker-icon').eq(0).click()
        cy.get('.btn-info').contains("ORDER").click()
        cy.get('.btn-info').contains("$").click()
    })
  })