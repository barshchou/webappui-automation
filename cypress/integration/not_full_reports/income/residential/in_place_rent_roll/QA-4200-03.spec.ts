import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4200-03.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";

describe("Verify the Import manager functionality", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.verifyViaCSVExist()
            .verifyUploadCSVRow(testData.links)
            .verifyRentRollOptions();
        Income.Residential.InPlaceRentRoll.verifyNumberOfResidentialUnits(testData.numberOfUnits)
            .uploadFile(testData.csvFileName, testData.csvNumberOfUnits);
        cy.reload();
        Income.Residential.InPlaceRentRoll.uploadFile(testData.xlsxFileName, testData.numberOfUnits)
            .goToPropSummaryWithSaveLeavingFirst();
        Property.Summary.verifyThatPageIsOpened()
            .enterNumberOfResUnits(testData.numberOfUnitsToChange)
            .goBackWithSave();
        Income.Residential.InPlaceRentRoll.uploadFile(testData.csvFileName, testData.csvNumberOfUnits)
            .verifyRentRollOptions();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});