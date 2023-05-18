describe('UserList', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('displays the user list', () => {
    cy.get('table').should('be.visible')
    cy.get('tbody tr').should('have.length.at.least', 6)
  })

  it('can add a new user', () => {
    cy.get('button').contains('Add User').click()

    cy.get('input[name="firstName"]').type('John')
    cy.get('input[name="lastName"]').type('Doe')
    cy.get('input[name="email"]').type('john.doe@example.com')
    cy.get('button').contains('Create User').click()

    cy.contains('User created successfully').should('exist')
  })

  it('can edit an existing user', () => {
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('button').contains('Edit').click()

        cy.get('input[name="firstName"]').clear().type('Jane')
        cy.get('input[name="lastName"]').clear().type('Doe')
        cy.get('input[name="email"]').clear().type('jane.doe@example.com')
        cy.get('button').contains('Save').click()
      })

    cy.contains('User updated successfully').should('exist')
  })

  it('can delete an existing user', () => {
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('button').contains('Delete').click()
      })

    cy.contains('User deleted successfully').should('exist')
  })
})
