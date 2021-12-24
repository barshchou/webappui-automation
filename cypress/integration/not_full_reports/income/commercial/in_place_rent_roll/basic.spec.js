import testData from "../../../../../fixtures/basicCommInPlaceRentRoll.fixtures";
import homepageActions from "../../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../../actions/base/navigationSection.actions";
import comRentRollActions from "../../../../../actions/income/commercial/rentRoll.actions";

describe("Basic commercial In-Place Rent Roll tests", () => {
    before("Create report and navigate to Commercial In-Place Rent Roll", () => {
        cy.login();
        homepageActions.createReport(testData.reportCreationData);
        navSectionActions.navigateToCommercialInPlaceRentRoll();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID236: Basis of Rent tooltip", () => {
        comRentRollActions.verifyBasisOfRentTooltip();
    });

    it("ID237: Rent Basis buttons", () => {
       comRentRollActions.verifyAllBasisButtons();
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        comRentRollActions.returnToHomePage();
        homepageActions.deleteReport(testData.reportCreationData.reportNumber);
    });
});
