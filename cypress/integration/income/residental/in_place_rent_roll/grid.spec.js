const testData = require("../../../../fixtures/grid.fixtures.json");
import homepageActions from "../../../../actions/base/homepage.actions";
import navigationSection from "../../../../actions/base/navigationSection.actions";
import rentRollActions from "../../../../actions/income/residental/rentRoll.actions";
import unitGroupsActions from "../../../../actions/income/residental/unitGroups.actions";
import summaryActions from "../../../../actions/property/summary.actions";

describe("In-Place Rent Roll grid tests", () => {
    before("Login and open In-Place Rent Roll", () => {
        cy.loginByApi();
        homepageActions.createReport();
        navigationSection.navigateToInPlaceRentRoll();
    });

    it("ID17 and ID18: GRID and #col.", () => {
        rentRollActions.verifyColumnExist(testData.sharpColumn);
    });

    it(`ID36: Save button, Navigate to other page without saving / with saving the page on the ‘You have unsaved changes.
    Would you like to save before continuing?’ modal window`, () => {
        cy.wait(10000);
        rentRollActions.checkCheckboxByLabel(testData.forecastLabel);
        rentRollActions.goToPropSummaryWithSaveSaveClickFirst();
        summaryActions.verifyThatPageIsOpened();
        summaryActions.goBackWithSave();
        rentRollActions.verifyCheckboxByLabelIsCheckedOrNot(testData.forecastLabel);
        rentRollActions.checkCheckboxByLabel(testData.forecastLabel, false);
        rentRollActions.goToPropSummaryWithoutSave();
        summaryActions.verifyThatPageIsOpened();
        summaryActions.goBackWithSave();
        rentRollActions.verifyCheckboxByLabelIsCheckedOrNot(testData.forecastLabel);
        rentRollActions.checkCheckboxByLabel(testData.forecastLabel, false);
    });

    it("ID37", () => {
        rentRollActions.checkCheckboxByLabel(testData.forecastLabel);
        rentRollActions.clickSaveContinueButton();
        unitGroupsActions.verifyThatPageIsOpened();
        unitGroupsActions.goBackWithSave();
        rentRollActions.checkCheckboxByLabel(testData.forecastLabel, false);
    });


    after("Delete report", () => {
        rentRollActions.returnToHomePageAndSave();
        homepageActions.deleteReport();
    });
});