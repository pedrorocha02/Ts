import Constants from "../../../readme_docs/Constants"

// User info
const username = Constants.USERNAME
const email = Constants.EMAIL

// Passwords
const password = Constants.PASSWORD_CORRECT
const passwordWrong = Constants.PASSWORD_WRONG
const passwordShort = Constants.PASSWORD_SHORT

// Set to true if manual check is required
const needsHuman = Constants.MANUAL_CHECK

beforeEach(() => {

  cy.viewport(1920, 1080)
  cy.visit('https://www.imdb.com/')

  // get the user button  
  cy.get('.navbar__user > a')
    .first()
    .click()

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
      .type(Constants.EMAIL_WRONG)

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
      .invoke('text').then((text) => {
        expect(text).to.not.equal(password)
      })

    cy.get("#ap_password_check")
      .type(password)
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
      .type(passwordWrong)

    cy.get("#continue").click()

    cy.get("#auth-error-message-box").within(() => {

      cy.get(".a-list-item")
        .contains('Passwords must match')
        .invoke('text').then((text) => {
          expect(text.trim()).equal('Passwords must match')
        });

    })

  })

  it('Checks for error if the password is too short', () => {

    // Fill everything

    // Name field
    cy.get("#ap_customer_name")
      .type(username)

    // // Email field
    cy.get("#ap_email")
      .type(email)

    // Password fields
    cy.get("#ap_password")
      .type(passwordShort)

    cy.get("#ap_password_check")
      .type(passwordShort)

    cy.get("#continue").click()

    if (needsHuman) {
      cy.wait(30000)
    }

    cy.get("#auth-error-message-box")
      .within(() => {
        cy.get(".a-list-item")
          .contains('Passwords must be at least 8 characters.')
          .invoke('text').then((text) => {
            expect(text.trim()).equal('Passwords must be at least 8 characters.')
          });
      })
  })

})