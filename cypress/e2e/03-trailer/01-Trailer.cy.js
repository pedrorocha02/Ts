describe("Trailer", () => {

  it("Search and play a trailer", () => {

    cy.viewport(1920, 1080);

    //Go to the website
    cy.visit('https://www.imdb.com/')

    //Click on the "Browse Trailes" button
    cy.get(".ipc-page-grid__item.ipc-page-grid__item--span-3")
      .contains("Browse trailers").click();

    //Click on the "Recently Added" button
    cy.get(".ipc-tab.ipc-tab--on-baseAlt").contains("RECENTLY ADDED").click();

    //Click on the third trailer that happears
    cy.get(".ipc-lockup-overlay.ipc-focusable").eq(2).click();

    // Click on the fullscreen button
    // cy.get(
    //   ".jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-icon-fullscreen"
    // )
    //   .invoke("show")
    //   .should("be.visible")
    //   .click();

    //Find and click the pause button
    // cy.get(".jw-icon.jw-icon-display.jw-button-color.jw-reset")
    //   .wait(2000)
    //   .click({ multiple: true })
    //   .should("be.visible")
    //   .click();

    // cy.get('.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed')
    //   .invoke('text').then((text) => {
    //     cy.wait(2000)
    //     const timeAtPause = text
    //     cy.wait(5000)
    //     cy.get('.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed').invoke('text').then((text) => {
    //       expect(text).to.equal(timeAtPause)
    //     })
    //   })

  });

});
