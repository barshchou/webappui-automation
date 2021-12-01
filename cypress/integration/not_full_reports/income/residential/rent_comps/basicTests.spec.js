import homepageActions from "../../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../../actions/base/navigationSection.actions";
import rentCompsActions from "../../../../../actions/income/residential/rent_comps/rentComps.actions";

describe("Basic Rent Comps tests", () => {
    before("Login and navigate to Rent Comps", () => {
       cy.loginByApi();
       homepageActions.createReport();
       navSectionActions.navigateToRentComps();
       cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID45: GC section: Comparable Rentals Introduction", () => {
        rentCompsActions.verifyGCText();
    });

    it("ID46, ID47 and ID48: Unit button, Building button and PopUp", () => {
        rentCompsActions.changeToBuildingSearch();
        rentCompsActions.changeToUnitSearch();
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        rentCompsActions.returnToHomePage();
        homepageActions.deleteReport();
    });
});
