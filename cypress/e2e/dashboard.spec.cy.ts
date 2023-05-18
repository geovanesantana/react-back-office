describe('Dashboard', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('displays the current user email in the title', () => {
    cy.get('h1').should('contain', 'testuser')
  })

  it('displays the welcome message', () => {
    cy.contains('Hello').should('exist')
    cy.contains('👋').should('exist')
  })

  it('displays a user in the list', () => {
    cy.get('[data-testid="user-list"]')
      .contains('@reqres.in')
      .should('be.visible')
  })

  it('shows users with email containing @reqres.in', () => {
    cy.get('[data-testid="user-email"]').each(($el) => {
      expect($el.text()).to.include('@reqres.in')
    })
  })
})
