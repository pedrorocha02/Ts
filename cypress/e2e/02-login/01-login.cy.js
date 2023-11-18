import Constants from "../../../readme_docs/Constants"

// User info
const username = Constants.USERNAME
const email = Constants.EMAIL
const emailNoAccount = Constants.EMAIL_NO_ACCOUNT
const password = Constants.PASSWORD_CORRECT

beforeEach(() => {

    cy.viewport(1920, 1080)
    cy.visit('https://www.imdb.com/')

    // get the user button  
    const userButton = cy.get('.navbar__user > a').first()

    // log out if required
    userButton.then(($userButton) => {
        if ($userButton.text().includes(username)) {
            cy.get('imdb-header-account-menu__sign-out')
                .click()
            cy.wait(5000)
        }
    })

    userButton.click()

    cy.get('.list-group > a')
        .first()
        .click()
})

describe('Login tests', () => {

    it('Login and check if the user name appears in the topmost navigation', () => {

        cy.get('input[type="email"]')
            .type(email)

        cy.get('input[type="password"]')
            .type(password)
            .invoke('text').then((text) => {
                expect(text).to.not.equal(password)
            })

        cy.get('#signInSubmit')
            .click()

        if (Constants.MANUAL_CHECK) {
            cy.wait(30000)
        }

        cy.get('.imdb-header__account-toggle--logged-in.imdb-header__accountmenu-toggle.navbar__user-name.navbar__user-menu-toggle__name')
            .invoke('text').then((text) => {
                expect(text).to.equal(username)
            })

    })

    it('Login without an account to check error', () => {

        cy.get('input[type="email"]')
            .type(emailNoAccount)

        cy.get('input[type="password"]')
            .type(password)
            .invoke('text').then((text) => {
                expect(text).to.not.equal(password)
            })

        cy.get('#signInSubmit')
            .click()

        if (Constants.MANUAL_CHECK) {
            cy.wait(30000)
        }

        // check for error message

        cy.get('#auth-error-message-box')
            .invoke('text').then((text) => {
                expect(text.trim()).to.contain('We cannot find an account with that email address')
            })


    })

})