describe('UpdateProfile', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/update-profile')
  })

  it('displays the current user email in the email input', () => {
    cy.get('#email-address').should('have.value', 'testuser@example.com')
  })

  it('updates the user profile when the form is submitted', () => {
    cy.get('#email-address').clear().type('testuser@example.com')
    cy.get('#password').type('testpassword')
    cy.get('#confirm-password').type('testpassword')
    cy.get('form').submit()

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.contains('Profile updated Successfully').should('exist')
  })

  it('displays an error message when password confirmation does not match', () => {
    cy.get('#confirm-password').type('differentpassword')
    cy.get('form').submit()
    cy.contains('Passwords do not match').should('exist')
  })
})
