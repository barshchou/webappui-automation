import homepageActions from "../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../actions/base/navigationSection.actions";
import rentCompsActions from "../../../../actions/income/residental/rentComps.actions";

describe("Add new comparable form tests", () => {
    before("Login and open rent comps page", () => {
        cy.loginByApi();
        homepageActions.createReport();
        navSectionActions.navigateToRentComps();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID67: Button: Add New Rent Comp > Property Search wizard opened > Select Address", () => {
        rentCompsActions.openAddNewComparableForm();
        rentCompsActions.clickCloseButton();
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        rentCompsActions.returnToHomePageAndSave();
        homepageActions.deleteReport();
    });
});