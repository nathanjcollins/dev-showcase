import 'cypress-network-idle'

describe('Sites', () => {
  beforeEach(() => {
    cy.login()
  })

  it('loads', () => {
    cy.get('span#welcome-msg').should('have.text', 'J Smith')
  })

  it('signs out', () => {
    cy.waitForNetworkIdle(2000)

    cy.get('a#signOut').click()

    cy.location('pathname').should((loc) => {
      expect(loc).to.eq('/')
    })
  })
})
