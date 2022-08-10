import testData from 
    "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4200-03.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";

describe("Verify the Import manager functionality", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Navigate to Income > Residential > In-Place Rent Roll");
            NavigationSection.navigateToResInPlaceRentRoll();

            cy.stepInfo("2. Verify exist elements");
            Income.Residential.InPlaceRentRoll.verifyViaCSVExist()
                .verifyUploadCSVRow(testData.links);
            testData.checkboxLabels.forEach(val => {
                Income.Residential.InPlaceRentRoll.Page.getCheckboxByLabel(val).should("exist");
            });

            cy.stepInfo("3. Upload CSV file and verify number of Res Units");
            Income.Residential.InPlaceRentRoll.verifyNumberOfResidentialUnits(testData.numberOfUnits)
                .uploadFile(testData.csvFileName, testData.csvNumberOfUnits);
            cy.reload();

            cy.stepInfo("4. Upload XLSX file and verify uploaded values");
            Income.Residential.InPlaceRentRoll.uploadFile(testData.xlsxFileName, testData.numberOfUnits)
                .goToPropSummaryWithSaveLeavingFirst();
            Property.Summary.verifyThatPageIsOpened()
                .enterNumberOfResUnits(testData.numberOfUnitsToChange)
                .goBackWithSave();

            cy.stepInfo("5. Upload CSV file and verify rent roll options");
            Income.Residential.InPlaceRentRoll.uploadFile(testData.csvFileName, testData.csvNumberOfUnits);
            testData.checkboxLabels.forEach(val => {
                Income.Residential.InPlaceRentRoll.Page.getCheckboxByLabel(val).should("exist");
            });
        });
    });