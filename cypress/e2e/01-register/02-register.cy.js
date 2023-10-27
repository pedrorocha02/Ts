const username = 'John Doe'
const email = 'tehoser254@newnime.com'
const password = 'eJuj9F&yWZK5o'

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

describe('Tests the login process', () => {

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