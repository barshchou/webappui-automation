import newTestData from "../../../../../fixtures/gridResInPlaceRentRoll.fixtures";
import homepageActions from "../../../../../actions/base/homepage.actions";
import navigationSection from "../../../../../actions/base/navigationSection.actions";
import rentRollActions from "../../../../../actions/income/residential/rentRoll.actions";
import unitGroupsActions from "../../../../../actions/income/residential/unitGroups.actions";
import summaryActions from "../../../../../actions/property/summary.actions";

describe("In-Place Rent Roll grid tests", () => {
    before("Login and open In-Place Rent Roll", () => {
        cy.login();
        homepageActions.createReport(newTestData.reportCreationData);
        navigationSection.navigateToInPlaceRentRoll();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID17 and ID18: GRID and #col.", () => {
        rentRollActions.verifyColumnExist(newTestData.commonData.sharpColumn);
    });

    it(`ID36: Save button, Navigate to other page without saving / with saving the page on the ‘You have unsaved changes.
    Would you like to save before continuing?’ modal window`, () => {
        rentRollActions.checkCheckboxByLabel(newTestData.commonData.forecastLabel)
            .goToPropSummaryWithSaveSaveClickFirst();
        summaryActions.verifyThatPageIsOpened()
            .goBackWithSave();
        rentRollActions.verifyCheckboxIsChecked(newTestData.commonData.forecastLabel)
            .uncheckCheckboxByLabel(newTestData.commonData.forecastLabel)
            .goToPropSummaryWithoutSave();
        summaryActions.verifyThatPageIsOpened()
            .goBackWithSave();
        rentRollActions.verifyCheckboxIsChecked(newTestData.commonData.forecastLabel)
            .uncheckCheckboxByLabel(newTestData.commonData.forecastLabel);
    });

    it("ID37: Save & Continue button", () => {
        rentRollActions.checkCheckboxByLabel(newTestData.commonData.forecastLabel)
            .clickSaveContinueButton();
        unitGroupsActions.verifyThatPageIsOpened()
            .goBack();
        rentRollActions.uncheckCheckboxByLabel(newTestData.commonData.forecastLabel);
    });


    after("Delete report", () => {
        cy.restoreLocalStorage();
        rentRollActions.returnToHomePage();
        homepageActions.deleteReport(newTestData.reportCreationData.reportNumber);
    });
});
