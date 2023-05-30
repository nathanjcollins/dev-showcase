describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit('http://localhost:3000')

    cy.get('h1').should('have.text', ' Dev Showcase ')
    cy.get('p').should(
      'have.text',
      ' A place to show off your portfolios or side projects! '
    )
  })
})
