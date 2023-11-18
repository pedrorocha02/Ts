import Constants from "../../../readme_docs/Constants"

// User info
const username = Constants.USERNAME
const email = Constants.EMAIL
const password = Constants.PASSWORD_CORRECT

beforeEach(() => {

    cy.viewport(1920, 1080)
    cy.visit('https://www.imdb.com/')

    // get the user button  
    cy.get('.navbar__user > a')
        .first()
        .click()

    cy.get('.create-account')
        .click()

    cy.get('.imdb-header__account-toggle--logged-in.imdb-header__accountmenu-toggle.navbar__user-name.navbar__user-menu-toggle__name')
        .invoke('text').then((text) => {
            expect(text).to.equal(username)
        })

})

describe('Tries to register an already existing user', () => {

    it('Checks for error if the email is already registered', () => {

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

        if (Constants.MANUAL_CHECK) {
            cy.wait(30000)
        }

        cy.get("#auth-warning-message-box")
            .within(() => {
                cy.get(".a-list-item")
                    .contains(email)
                    .should('have.text', email)
            })

    })

})