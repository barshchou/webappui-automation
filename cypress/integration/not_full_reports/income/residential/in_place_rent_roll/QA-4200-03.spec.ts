import testData from 
    "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4200-03.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income, Property } from "../../../../../actions";
import Enums from "../../../../../enums/enums";

describe("Verify the Import manager functionality", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("1. Navigate to Income > Residential > In-Place Rent Roll");
            _NavigationSection.navigateToResInPlaceRentRoll();

            cy.stepInfo("2. Verify exist elements");
            Income._Residential.InPlaceRentRoll.verifyViaCSVExist()
                .verifyUploadCSVRow(testData.links);
            testData.checkboxLabels.forEach(val => {
                Income._Residential.InPlaceRentRoll.Page.getCheckboxByLabel(val).should("exist");
            });

            cy.stepInfo("3. Upload CSV file and verify number of Res Units");
            Income._Residential.InPlaceRentRoll.verifyNumberOfResidentialUnits(testData.numberOfUnits)
                .uploadFile(testData.csvFileName, testData.csvNumberOfUnits);
            cy.reload();

            cy.stepInfo("4. Upload XLSX file and verify uploaded values");
            Income._Residential.InPlaceRentRoll.uploadFile(testData.xlsxFileName, testData.numberOfUnits)
                .goToPropSummaryWithSaveLeavingFirst();
            Property._Summary.verifyThatPageIsOpened()
                .clickEditDataBySectionName(Enums.EDIT_ON_SUBJECT_PROPERTY_SECTIONS.asIsBuildingDescription)
                .submitSaveChangesModal();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnitsToChange);
            _NavigationSection.navigateToResInPlaceRentRoll();

            cy.stepInfo("5. Upload CSV file and verify rent roll options");
            Income._Residential.InPlaceRentRoll.uploadFile(testData.csvFileName, testData.csvNumberOfUnits);
            testData.checkboxLabels.forEach(val => {
                Income._Residential.InPlaceRentRoll.Page.getCheckboxByLabel(val).should("exist");
            });
        });
    });