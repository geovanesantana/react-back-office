describe('Navbar', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('navigates to the dashboard when the Dashboard link is clicked', () => {
    cy.contains('Dashboard').click()
    cy.location('pathname').should('eq', '/')
  })

  it('toggles dark mode on when clicked and off when clicked again', () => {
    cy.get('[data-testid="dark-mode"]').click()
    cy.get('.app').should('have.class', 'dark')

    cy.get('[data-testid="dark-mode"]').click()
    cy.get('.app').should('not.have.class', 'dark')
  })

  it('displays the profile picture dropdown menu when clicked', () => {
    cy.get('button[data-testid="menu-profile"]').click()
    cy.contains('Edit Profile').should('be.visible')
    cy.contains('Log Out').should('be.visible')
  })

  it('navigate to update profile menu when clicked', () => {
    cy.get('button[data-testid="menu-profile"]').click()
    cy.contains('Edit Profile').click()
    cy.location('pathname').should('eq', '/update-profile')
  })

  it('log out the user when the Log Out button is clicked', () => {
    cy.get('button[data-testid="menu-profile"]').click()
    cy.contains('Log Out').click()
    cy.location('pathname').should('eq', '/login')
  })
})
