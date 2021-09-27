const testData = require("../../../../fixtures/basicRentComps.fixtures.json");
import homepageActions from "../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../actions/base/navigationSection.actions";
import rentCompsActions from "../../../../actions/income/residental/rentComps.actions"

describe("Basic Rent Comps tests", () => {
    before("Login and navigate to Rent Comps", () => {
       cy.loginByApi();
       homepageActions.createReport();
       navSectionActions.navigateToRentComps();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID45: GC section: Comparable Rentals Introduction", () => {
        rentCompsActions.verifyGCText();
    });

    it("ID46 and ID47: Unit button and Building button", () => {
        rentCompsActions.clickBuildingSwitchButton();
        rentCompsActions.clickSwitchConfirmButton();
        rentCompsActions.verifyBuildingSelected();
        rentCompsActions.clickUnitSwitchButton();
        rentCompsActions.clickSwitchConfirmButton();
        rentCompsActions.verifyUnitSelected();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    after("Delete report", () => {
        rentCompsActions.returnToHomePageAndSave();
        homepageActions.deleteReport();
    });
});