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

   after("Delete report", () => {
      cy.restoreLocalStorage();
      rentCompsActions.returnToHomePageAndSave();
      homepageActions.deleteReport();
   });
});