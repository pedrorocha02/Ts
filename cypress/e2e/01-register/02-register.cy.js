import Constants from "../../../readme_docs/Constants"

// User info
const username = Constants.USERNAME
const email = Constants.EMAIL
const password = Constants.PASSWORD_CORRECT

// set to true if manual check is required
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

describe('Test the registration process', () => {

    it('Registers a user', () => {

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
            .type(password)

        cy.get("#continue").click()

        if (needsHuman) {
            cy.wait(120000)
        }
    })

    it('Checks if users already has an account', () => {

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
            .type(password)

        cy.get("#continue").click()

        cy.get("#auth-warning-message-box")
            .within(() => {
                cy.get(".a-list-item")
                    .contains(email)
                    .should('have.text', email)
            })

    })

})