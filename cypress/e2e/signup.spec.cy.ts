describe('Signup', () => {
  let email: string

  beforeEach(() => {
    cy.visit('/signup')
    email = Cypress.env('email') || Cypress._.random(0, 1e6) + '@example.com'
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

  it('should display error message if passwords do not match', () => {
    cy.get('#email-address').type(email)
    cy.get('#password').type('testpassword')
    cy.get('#confirm-password').type('differentpassword')
    cy.get('[type="submit"]').click()
    cy.contains('Passwords do not match')
  })

  it('should navigate to home if sign up successful', () => {
    cy.get('#email-address').type(email)
    cy.get('#password').type('testpassword')
    cy.get('#confirm-password').type('testpassword')
    cy.get('[type="submit"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})
