import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4200-02.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, Property } from "../../../../../actions";

describe(`Verify if "Per Year" time period PSF Rent based on is selected - > 
    the calculation of "Rent PSF" should be Monthly Rent *12/Square Footage/`, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.verifyViaCSVExist();
        Income._Residential.InPlaceRentRoll.verifyUploadCSVRow(testData.links);
        Income._Residential.InPlaceRentRoll.verifyNumberOfResidentialUnits(testData.numberOfUnits)
            .uploadFile(testData.csvFileName, testData.csvNumberOfUnits);
        cy.reload();
        Income._Residential.InPlaceRentRoll.uploadFile(testData.xlsxFileName, testData.numberOfUnits)
            .goToPropSummaryWithSaveLeavingFirst();
        Property._Summary.verifyThatPageIsOpened()
            .enterNumberOfResUnits(testData.numberOfUnitsToChange)
            .goBackWithSave();
        Income._Residential.InPlaceRentRoll.uploadFile(testData.csvFileName, testData.csvNumberOfUnits);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});