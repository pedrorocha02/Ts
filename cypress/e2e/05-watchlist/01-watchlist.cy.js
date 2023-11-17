const username = 'John Doe'
const email = 'fagaxog869@rdluxe.com'
const password = 'EorKcyET*NP^3X%o4Zq%&cEiGA^T7c#6#jb%6U!3ozGiTNPQTD'

// TODO: slide 24 - powerpoint 5

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

describe('Adds a movie to the watchlist', () => {

    it('User login', () => {

        let title = ''

        cy.get('input[type="email"]')
            .type(email)

        cy.get('input[type="password"]')
            .type(password)

        cy.get('#signInSubmit')
            .click()

        cy.get('.imdb-header__watchlist-button')
            .click()

        cy.get('.empty-react-watchlist > a')
            .first()
            .click()

        cy.get('li.ipc-metadata-list-summary-item button.ipc-icon-button')
            .eq(0)
            .click()

        cy.get('.ipc-promptable-base__content h3.ipc-title__text')
            .invoke('text')
            .as('titleBefore').then((text) => {
                title = text
            })

        cy.get('.ipc-promptable-base__content button.ipc-btn.ipc-btn--full-width.ipc-btn--center-align-content.ipc-btn--default-height.ipc-btn--core-baseAlt.ipc-btn--theme-baseAlt.ipc-btn--on-accent2.ipc-secondary-button')
            .click()

        cy.get('button[title="Close Prompt"]')
            .click()

        cy.get('.imdb-header__watchlist-button')
            .click()

        cy.get('h3.lister-item-header > a')
            .invoke('text')
            .as('titleAfter')

        cy.get('@titleAfter').then((text) => {
            expect(text).to.equal(title)
        })

    })

    // TODO: add a movie in another way

})