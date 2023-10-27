
describe("Trailer", () => {
  it("Search and play a trailer", () => {
    cy.viewport(1920, 1080);
    //Go to the website
    cy.visit("https://www.imdb.com/");

    //Click on the "Browse Trailes" button
    cy.get(".sc-57727bb1-4.dXHYug > a").first().click();

    //Click on the "Recently Added" button
    cy.get(".ipc-tab.ipc-tab--on-baseAlt").last().click();

    //Click on the fisrt trailer that happears
    cy.get(".ipc-lockup-overlay.ipc-focusable").first().click();

    //Find and click on the close button after the trailer starts
    cy.get(".sc-c766f276-1.kFlXkA > a").first().click();

    //Select the third trailer in the "Trending Trailers" section
    cy.get(".ipc-lockup-overlay.ipc-focusable").eq(3).click();

    //Find and click the pause button
    cy.get(".jw-icon.jw-icon-display.jw-button-color.jw-reset")
      .click({ multiple: true })
      .should("be.visible");

    // Wait for a specified duration in milliseconds
    cy.wait(1000);

    //Go to the prevoius trailer by click the previous button
    cy.get(".jw-icon.jw-button-color.jw-reset.jw-icon-previous")
      .invoke("show")
      .should("be.visible")
      .click({ multiple: true });

    //Mute the trailer
    cy.get(
      ".jw-icon.jw-icon-tooltip.jw-icon-volume.jw-button-color.jw-reset.jw-full"
    ).click({ multiple: true });

    // Click on the fullscreen button
    cy.get(
      ".jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-icon-fullscreen"
    )
      .invoke("show")
      .should("be.visible")
      .click({ multiple: true });

    // Trailer progression bar (WORK IN PROGRESS!!!)
    cy.get(
      ".jw-slider-time.jw-background-color.jw-reset.jw-slider-horizontal.jw-reset"
    ).then(($progressBar) => {
      // Calculate the X-coordinate for the desired time (e.g., 50% of the progress bar width)
      const progressBarWidth = $progressBar.width();
      const desiredTimePercentage = 50; // Change this to your desired time percentage
      const xCoordinate = (progressBarWidth * desiredTimePercentage) / 100;

      // Trigger mouse events to simulate dragging the progress bar
      cy.get(
        ".jw-slider-time.jw-background-color.jw-reset.jw-slider-horizontal.jw-reset"
      )
        .trigger("mousedown", { clientX: 0 })
        .trigger("mousemove", { clientX: xCoordinate })
        .click();
    });

    //Unmute the trailer
    cy.get(
      ".jw-icon.jw-icon-tooltip.jw-icon-volume.jw-button-color.jw-reset.jw-off"
    ).click({ multiple: true });
  });
});