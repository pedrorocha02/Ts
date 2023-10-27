const username = 'John Doe'
const email = 'fagaxog869@rdluxe.com'
const password = 'EorKcyET*NP^3X%o4Zq%&cEiGA^T7c#6#jb%6U!3ozGiTNPQTD'

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

    cy.get('.list-group > a')
        .first()
        .click()
})

describe('Tests the registration process', () => {

    it('User login', () => {

        cy.get('input[type="email"]')
            .type(email)

        cy.get('input[type="password"]')
            .type(password)

        cy.get('#signInSubmit')
            .click()

    })

})