describe("Trailer", () => {
  it("Search and play a trailer", () => {
    cy.viewport(1920, 1080);
    //Go to the website
    cy.visit("https://www.imdb.com/");

    //Click on the "Browse Trailes" button
    cy.get("https://www.imdb.com/").contains("Browse trailers").click();

    //Click on the "Recently Added" button
    cy.get(".ipc-tab.ipc-tab--on-baseAlt").contains("RECENTLY ADDED").click();

    //Click on the third trailer that happears
    cy.get(".ipc-lockup-overlay.ipc-focusable").eq(2).click();

    // Click on the fullscreen button
    cy.get(
      ".jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-icon-fullscreen"
    )
      .invoke("show")
      .should("be.visible")
      .click({ multiple: true });
    /*
            // Trailer progression bar
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

            //Go to the next trailer by click the next button
            cy.get(".jw-icon.jw-button-color.jw-reset.jw-icon-next")
              .invoke("show")
              .should("be.visible")
              .click({ multiple: true });

            //Go to the previous trailer by click the previous button
            cy.get(".jw-icon.jw-button-color.jw-reset.jw-icon-previous")
              .invoke("show")
              .should("be.visible")
              .click({ multiple: true });

            //Find and click the pause button
            cy.get(".jw-icon.jw-icon-display.jw-button-color.jw-reset")
              .click({ multiple: true })
              .should("be.visible");
        */
    //Mute the trailer
    cy.get(
      ".jw-icon.jw-icon-tooltip.jw-icon-volume.jw-button-color.jw-reset.jw-full"
    ).click({ multiple: true });

    //Unmute the trailer
    cy.get(
      ".jw-icon.jw-icon-tooltip.jw-icon-volume.jw-button-color.jw-reset.jw-off"
    ).click({ multiple: true });

    //Find and click on the close button
    cy.get('[data-testid="action-bar"]').contains("Close").click();
  });
});
