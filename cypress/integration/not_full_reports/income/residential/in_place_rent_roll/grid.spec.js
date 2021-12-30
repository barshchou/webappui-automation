import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/gridResInPlaceRentRoll.fixtures";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";
import {waitForTime} from "../../../../../../utils/waiters.utils";

describe("In-Place Rent Roll grid tests", () => {
    before("Login and open In-Place Rent Roll", () => {
        cy.login();
        waitForTime();
        Homepage.createReport(testData.reportCreationData);
        NavigationSection.navigateToResInPlaceRentRoll();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID17 and ID18: GRID and #col.", () => {
        Income.Residential.InPlaceRentRoll.verifyColumnExist(testData.commonData.sharpColumn);
    });

    it(`ID36: Save button, Navigate to other page without saving / with saving the page on the ‘You have unsaved changes.
    Would you like to save before continuing?’ modal window`, () => {
        Income.Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.commonData.forecastLabel)
            .goToPropSummaryWithSaveSaveClickFirst();
        Property.Summary.verifyThatPageIsOpened()
            .goBackWithSave();
        Income.Residential.InPlaceRentRoll.verifyCheckboxIsChecked(testData.commonData.forecastLabel)
            .uncheckCheckboxByLabel(testData.commonData.forecastLabel)
            .goToPropSummaryWithoutSave();
        Property.Summary.verifyThatPageIsOpened()
            .goBackWithSave();
        Income.Residential.InPlaceRentRoll.verifyCheckboxIsChecked(testData.commonData.forecastLabel)
            .uncheckCheckboxByLabel(testData.commonData.forecastLabel);
    });

    it("ID37: Save & Continue button", () => {
        Income.Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.commonData.forecastLabel)
            .clickSaveContinueButton();
        Income.Residential.UnitGroups.verifyThatPageIsOpened()
            .goBack();
        Income.Residential.InPlaceRentRoll.uncheckCheckboxByLabel(testData.commonData.forecastLabel);
    });


    after("Delete report", () => {
        cy.restoreLocalStorage();
        Income.Residential.InPlaceRentRoll.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});
