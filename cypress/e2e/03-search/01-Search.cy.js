const title = "Titanic"
const filter = "Titles"
const invalidTitle = "qwertyasdfghzxcvb123456"
const forceErrorChar = "?"
const errorMessage = "Error"
const emptyPromptMessage = "Search IMDb by typing a word or phrase in the search box at the top of this page."

beforeEach(() => {
  cy.viewport(1920, 1080)
  cy.visit('https://www.imdb.com/')
})

describe("Search", () => {

  it("Search a valid movie title", () => {

    // Click on the filter button
    cy.get("#nav-search-form").contains("All").click();

    // Select the Titles option
    cy.get(".ipc-list.searchCatSelector.ipc-list--baseAlt")
      .contains(filter)
      .click().then((el) => {
        expect(el).to.contain(filter);
      });

    // Write the Titanic movie name in the search bar
    cy.get("#suggestion-search").type(title);

    // Click on the search button
    cy.get("#suggestion-search-button").click();

    // Click on the first result that appears Titanic
    cy.get(".ipc-metadata-list-summary-item__tc")
      .contains(title)
      .first()
      .click();

    // Check if the title of the movie is the same as the one searched
    cy.get('[data-testid="hero__pageTitle"]')
      .invoke("text").then((text) => {
        expect(text).to.include(title);
      });

  });

  it('Search for a invalid movie title', () => {

    // Click on the filter button
    cy.get("#nav-search-form").contains("All").click();

    // Select the Titles option
    cy.get(".ipc-list.searchCatSelector.ipc-list--baseAlt")
      .contains(filter)
      .click().then((el) => {
        expect(el).to.contain(filter);
      });

    // Write the Titanic movie name in the search bar
    cy.get("#suggestion-search").type(invalidTitle);

    // Click on the search button
    cy.get("#suggestion-search-button").click();

    // Check if the message "No results found for "qwertyasdfghzxcvb123456" appears
    cy.get(`[data-testid="results-section-empty-results-msg"]`)
      .invoke("text").then((text) => {
        expect(text).to.equal("No results found for \"" + invalidTitle + "\"");
      });
  })

  it('Force an error page', () => {

    // Click on the filter button
    cy.get("#nav-search-form").contains("All").click();

    // Select the Titles option
    cy.get(".ipc-list.searchCatSelector.ipc-list--baseAlt")
      .contains(filter)
      .click().then((el) => {
        expect(el).to.contain(filter);
      });

    // Write the Titanic movie name in the search bar
    cy.get("#suggestion-search").type(forceErrorChar);

    // Click on the search button
    cy.get("#suggestion-search-button").click();

    // Check if the error page appears
    cy.title().should('contains', errorMessage)

  })

  it('Check if an empty search prompts a suggestion', () => {

    // Click on the filter button
    cy.get("#nav-search-form").contains("All").click();

    // Select the Titles option
    cy.get(".ipc-list.searchCatSelector.ipc-list--baseAlt")
      .contains(filter)
      .click().then((el) => {
        expect(el).to.contain(filter);
      });

    // Write the Titanic movie name in the search bar
    cy.get("#suggestion-search").type(" ");

    // Click on the search button
    cy.get("#suggestion-search-button").click();

    // Check if the error page appears
    cy.get('.ipc-page-section.ipc-page-section--base')
      .invoke("text").then((text) => {
        expect(text).to.include(emptyPromptMessage);
      });

  })

});
