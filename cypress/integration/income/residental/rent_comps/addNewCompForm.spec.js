const testData = require("../../../../fixtures/addNewCompForm.fixtures.json");
import homepageActions from "../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../actions/base/navigationSection.actions";
import rentCompsActions from "../../../../actions/income/residental/rent_comps/rentComps.actions";
import addCompFormActions from "../../../../actions/income/residental/rent_comps/addCompForm.actions";

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
        addCompFormActions.clickCloseButton();
    });

    it("ID68: Address, Neighborhood, Block, Lot are at the top of the form", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.verifyPropAddressExist();
        addCompFormActions.clickCloseButton();
    });

    it("ID69:  Unit Number* text field", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.verifyUnitNumbFieldName();
        addCompFormActions.enterUnitNumber(testData.unitNumber);
        addCompFormActions.clickCloseButton();
    });

    it("ID70: Unit Type dropdown", () => {
       rentCompsActions.openAddNewComparableForm();
       addCompFormActions.selectListUnitTypes(testData.unitTypes);
       addCompFormActions.clickCloseButton();
    });

    it("ID71: Monthly Rent* text field", () => {
        rentCompsActions.openAddNewComparableForm();
        addCompFormActions.verifyMonthRentFieldName();
        addCompFormActions.enterMonthlyRent(testData.monthlyRent);
        addCompFormActions.clickCloseButton();
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        rentCompsActions.returnToHomePageAndSave();
        homepageActions.deleteReport();
    });
});