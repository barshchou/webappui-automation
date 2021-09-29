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
       rentCompsActions.enterMinRent(testData.minRentValue);
       rentCompsActions.clearMinRent();
    });

    it("ID52: Max Rent text field", () => {
        rentCompsActions.enterMaxRent(testData.maxRentValue);
        rentCompsActions.clearMaxRent();
    });

    it("ID53: Min SF text field", () => {
       rentCompsActions.enterMinSF(testData.minSquareFeet);
       rentCompsActions.clearMinSF();
    });

    it("ID54: Max SF text field", () => {
        rentCompsActions.enterMaxSF(testData.maxSquareFeet);
        rentCompsActions.clearMaxSF();
    });

   after("Delete report", () => {
      cy.restoreLocalStorage();
      rentCompsActions.returnToHomePageAndSave();
      homepageActions.deleteReport();
   });
});