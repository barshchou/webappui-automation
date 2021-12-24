import testData from "../../../../../fixtures/gridResInPlaceRentRoll.fixtures";
import homepageActions from "../../../../../actions/base/homepage.actions";
import navigationSection from "../../../../../actions/base/navigationSection.actions";
import rentRollActions from "../../../../../actions/income/residential/rentRoll.actions";
import unitGroupsActions from "../../../../../actions/income/residential/unitGroups.actions";
import summaryActions from "../../../../../actions/property/summary.actions";

describe("In-Place Rent Roll grid tests", () => {
    before("Login and open In-Place Rent Roll", () => {
        cy.login();
        homepageActions.createReport(testData.reportCreationData);
        navigationSection.navigateToInPlaceRentRoll();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID17 and ID18: GRID and #col.", () => {
        rentRollActions.verifyColumnExist(testData.commonData.sharpColumn);
    });

    it(`ID36: Save button, Navigate to other page without saving / with saving the page on the ‘You have unsaved changes.
    Would you like to save before continuing?’ modal window`, () => {
        rentRollActions.checkCheckboxByLabel(testData.commonData.forecastLabel)
            .goToPropSummaryWithSaveSaveClickFirst();
        summaryActions.verifyThatPageIsOpened()
            .goBackWithSave();
        rentRollActions.verifyCheckboxIsChecked(testData.commonData.forecastLabel)
            .uncheckCheckboxByLabel(testData.commonData.forecastLabel)
            .goToPropSummaryWithoutSave();
        summaryActions.verifyThatPageIsOpened()
            .goBackWithSave();
        rentRollActions.verifyCheckboxIsChecked(testData.commonData.forecastLabel)
            .uncheckCheckboxByLabel(testData.commonData.forecastLabel);
    });

    it("ID37: Save & Continue button", () => {
        rentRollActions.checkCheckboxByLabel(testData.commonData.forecastLabel)
            .clickSaveContinueButton();
        unitGroupsActions.verifyThatPageIsOpened()
            .goBack();
        rentRollActions.uncheckCheckboxByLabel(testData.commonData.forecastLabel);
    });


    after("Delete report", () => {
        cy.restoreLocalStorage();
        rentRollActions.returnToHomePage();
        homepageActions.deleteReport(testData.reportCreationData.reportNumber);
    });
});
