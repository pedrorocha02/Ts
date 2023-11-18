const trailersPage = "Browse trailers";
const selectorFilter = "RECENTLY ADDED";
const alternativePathKey = "Latest Trailers";

beforeEach(() => {
  cy.viewport(1920, 1080);
  cy.visit("https://www.imdb.com/");
});

describe("Trailer", () => {
  it("Search and play and pause a trailer", () => {
    //Click on the "Browse Trailes" button
    cy.get(".ipc-page-grid__item.ipc-page-grid__item--span-3")
      .contains(trailersPage)
      .click();

    //Click on the "Recently Added" item
    cy.get(".ipc-tab.ipc-tab--on-baseAlt").contains(selectorFilter).click();

    //Click on the third trailer that happears
    cy.get(".ipc-lockup-overlay.ipc-focusable").eq(2).click();

    //Find and click the pause button
    cy.get(".jw-icon.jw-icon-display.jw-button-color.jw-reset")
      .should("be.visible")
      .click();

    //Wait 1 seconds
    cy.wait(1000);

    // Save the time at pause
    cy.get(".jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed")
      .invoke("text")
      .as("pausedTime")
      .then((text) => {
        return text;
      });

    //Wait 1 seconds
    cy.wait(1000);

    //Find out if the time has changed since the pause
    cy.get("@pausedTime").then((pausedTime) => {
      cy.get(".jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed")
        .invoke("text")
        .then((text) => {
          expect(text).to.equal(pausedTime);
        });
    });

    //Find and click the play button
    cy.get(".jw-icon.jw-icon-display.jw-button-color.jw-reset")
      .should("be.visible")
      .click();
  });

  it("Alternative path to play and pause a trailer", () => {
    cy.get("#imdbHeader-navDrawerOpen").click();

    cy.get(".navlinkcat__listContainerInner > ul > :nth-child(2)")
      .contains(alternativePathKey)
      .click();

    //Click on the "Recently Added" item
    cy.get(".ipc-tab.ipc-tab--on-baseAlt").contains(selectorFilter).click();

    //Click on the third trailer that happears
    cy.get(".ipc-lockup-overlay.ipc-focusable").eq(2).click();

    //Find and click the pause button
    cy.get(".jw-icon.jw-icon-display.jw-button-color.jw-reset")
      .should("be.visible")
      .click();

    //Wait 1 seconds
    cy.wait(1000);

    // Save the time at pause
    cy.get(".jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed")
      .invoke("text")
      .as("pausedTime")
      .then((text) => {
        return text;
      });

    //Wait 1 seconds
    cy.wait(1000);

    //Find out if the time has changed since the pause
    cy.get("@pausedTime").then((pausedTime) => {
      cy.get(".jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed")
        .invoke("text")
        .then((text) => {
          expect(text).to.equal(pausedTime);
        });
    });

    //Find and click the play button
    cy.get(".jw-icon.jw-icon-display.jw-button-color.jw-reset")
      .should("be.visible")
      .click();
  });
});
