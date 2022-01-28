import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4401&04.fixture";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the Save and Save&Continue buttons functionality", () => {
    beforeEach("Login, create report, check checkbox", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.forecastLabel);
    });

    it("QA-4401 Save button", () => {
        Income.Residential.InPlaceRentRoll.clickSaveButton();
        cy.reload();
        Income.Residential.InPlaceRentRoll.verifyProgressBarNotExist()
            .verifyCheckboxIsChecked(testData.forecastLabel);
        deleteReport();
    });

    it("QA-4404 Save&Continue button", () => {
        Income.Residential.InPlaceRentRoll.clickSaveContinueButton();
        Income.Residential.UnitGroups.verifyThatPageIsOpened()
            .goBackWithSave();
        Income.Residential.InPlaceRentRoll.verifyCheckboxIsChecked(testData.forecastLabel);
    });

    const deleteReport = () => {
        Income.Residential.InPlaceRentRoll.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    };
});