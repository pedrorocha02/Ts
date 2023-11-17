describe("Search", () => {
  it("Search and click on the search details", () => {
    cy.viewport(1920, 1080);
    //Go to the website
    cy.visit("https://www.imdb.com/");

    //Click on the filter button
    cy.get("#nav-search-form").contains("All").click();

    //Select the Titles option
    cy.get(".ipc-list.searchCatSelector.ipc-list--baseAlt")
      .contains("Titles")
      .click();

    //Write the Titanic movie name in the search bar
    cy.get("#suggestion-search").type("Titanic");

    //Click on the search button
    cy.get("#suggestion-search-button").click();

    //Click on the first result that appears Titanic
    cy.get(".ipc-metadata-list-summary-item__tc")
      .contains("Titanic")
      .first()
      .click();

    //Checks if the movie has the DiCaprio name
    cy.get('[data-testid="hero__pageTitle"]').contains("Titanic").click();
    cy.go("back");
    /*
                                                //Click on the movie popularity rating
                                                cy.get('[data-testid="hero-rating-bar__popularity"] > a').first().click();
                                                cy.go("back");

                                                //Click on the movie multiple videos
                                                cy.get('[data-testid="hero__video-link"]').first().click();
                                                cy.go("back");

                                                //Click on the movie photos
                                                cy.get('[data-testid="hero__photo-link"]').first().click();
                                                cy.go("back");

                                                //Click on the IMdb rating
                                                cy.get('[data-testid="hero-rating-bar__aggregate-rating"] > a')
                                                  .first()
                                                  .click();
                                                cy.go("back");

                                                //Play the trailer
                                                cy.get('[data-testid="hero-media__slate"]').first().click();
                                                */
  });
});
