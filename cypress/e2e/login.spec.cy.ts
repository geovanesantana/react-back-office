describe('Login', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('/login')
  })

  it('should display message if email is missing', () => {
    cy.get('#password').type('testpassword')
    cy.get('[type="submit"]').click()
    cy.get('#email-address').should('have.focus')
    cy.get<HTMLInputElement>('#email-address').then(($input) => {
      const validationMessage = $input[0].validationMessage
      expect(validationMessage).to.equal('Please fill in this field.')
    })
  })

  it('should display message if password is missing', () => {
    cy.get('#email-address').type('testuser@example.com')
    cy.get('[type="submit"]').click()
    cy.get('#password').should('have.focus')
    cy.get<HTMLInputElement>('#password').then(($input) => {
      const validationMessage = $input[0].validationMessage
      expect(validationMessage).to.equal('Please fill in this field.')
    })
  })

  it('should navigate to home if login is successful', () => {
    cy.get('#email-address').type('testuser@example.com')
    cy.get('#password').type('testpassword')
    cy.get('[type="submit"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})
