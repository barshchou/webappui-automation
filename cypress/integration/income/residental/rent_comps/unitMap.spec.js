const testData = require("../../../../fixtures/unitMapRentComps.fixtures.json");
import homepageActions from "../../../../actions/base/homepage.actions";
import navSectionActions from "../../../../actions/base/navigationSection.actions";
import rentCompsActions from "../../../../actions/income/residental/rentComps.actions";

describe("Unit map tests", () => {
   before("Login and open Rent Comps", () => {
       cy.loginByApi();
       homepageActions.createReport();
       navSectionActions.navigateToRentComps();
       cy.saveLocalStorage();
   });

   beforeEach(() => {
       cy.restoreLocalStorage();
   });

    it("ID50: Unit Types dropdown", () => {
        rentCompsActions.clickUnitTypesArrowButton();
        rentCompsActions.checkUncheckListOfCheckboxesByQa(testData.unitTypesQaAttr);
        rentCompsActions.checkUncheckListOfCheckboxesByQa(testData.unitTypesQaAttr, false);
        rentCompsActions.clickUnitTypesArrowButton();
    });

    it("ID51: Min Rent text field", () => {
        const filedName = "minRent";
        rentCompsActions.enterValueToInput(filedName, testData.minRentValue);
        rentCompsActions.clearInput(filedName);
    });

    it("ID52: Max Rent text field", () => {
        const fieldName = "maxRent";
        rentCompsActions.enterValueToInput(fieldName, testData.maxRentValue);
        rentCompsActions.clearInput(fieldName);
    });

    it("ID53: Min SF text field", () => {
        const fieldName = "minSF";
        rentCompsActions.enterValueToInput(fieldName, testData.minSquareFeet);
        rentCompsActions.clearInput(fieldName);
    });

    it("ID54: Max SF text field", () => {
        const fieldName = "maxSF";
        rentCompsActions.enterValueToInput(fieldName, testData.maxSquareFeet);
        rentCompsActions.clearInput(fieldName);
    });

   after("Delete report", () => {
      cy.restoreLocalStorage();
      rentCompsActions.returnToHomePageAndSave();
      homepageActions.deleteReport();
   });
});