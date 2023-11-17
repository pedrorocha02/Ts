const username = 'John Doe'
const email = 'tehoser254@newnime.com'
const password = 'eJuj9F&yWZK5o'
const wrongPassword = 'sTyk9G/wFGH6p'

// TODO: add a decision table

beforeEach(() => {

  cy.viewport(1920, 1080)
  cy.visit('https://www.imdb.com/')

  // get the user button  
  const userButton = cy.get('.navbar__user > a').first()

  // log out if required
  userButton.then(($userButton) => {
    if ($userButton.text().includes(username.substring(0, username.indexOf(' ')))) {
      cy.get('imdb-header-account-menu__sign-out')
        .click()
      cy.wait(5000)
    }
  })

  userButton.click()

  cy.get('.create-account')
    .click()
})

describe('Tests form input types, warnings and errors', () => {

  it('Checks for warning message for all missing fields', () => {

    // Tries to register without filling any field
    cy.get("#continue").click()

    cy.get("#auth-error-message-box").within(() => {

      cy.get(".a-list-item")
        .should('have.length', 3).then(($list) => {
          expect($list[0].innerText).to.equal('Enter your name')
          expect($list[1].innerText).to.equal('Enter your email')
          expect($list[2].innerText).to.equal('Enter your password')
        })

    })

  })

  it('Checks for error if the email is not valid', () => {

    // Fills the email field
    cy.get("#ap_email")
      .type('not_an_email')

    cy.get("#continue").click()

    cy.get("#auth-error-message-box").within(() => {

      cy.get(".a-list-item")
        .contains('Enter a valid email address')
        .invoke('text').then((text) => {
          expect(text.trim()).equal('Enter a valid email address')
        });

    })

  })

  it('Checks if password are not being displayed', () => {

    // Password fields

    cy.get("#ap_password")
      .type(password)

    cy.get("#ap_password")
      .invoke('text').then((text) => {
        expect(text).to.not.equal(password)
      })

    cy.get("#ap_password_check")
      .type(password)

    cy.get("#ap_password_check")
      .invoke('text').then((text) => {
        expect(text).to.not.equal(password)
      })

  })

  it('Checks for error if the passwords don\'t match', () => {

    // Fill every thing

    // Name field
    cy.get("#ap_customer_name")
      .type(username)

    // Email field
    cy.get("#ap_email")
      .type(email)

    // Password fields
    cy.get("#ap_password")
      .type(password)

    cy.get("#ap_password_check")
      .type(wrongPassword)

    cy.get("#continue").click()

    cy.get("#auth-error-message-box").within(() => {

      cy.get(".a-list-item")
        .contains('Passwords must match')
        .invoke('text').then((text) => {
          expect(text.trim()).equal('Passwords must match')
        });

    })

  })

  // TODO: register user

  // TODO: try to register with the same email

})