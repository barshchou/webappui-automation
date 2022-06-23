import { reportCreationData } from '../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4210.fixture';
import { _NavigationSection } from './../../../../../actions/base/index';
import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4210.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Income, Property, ReviewExport } from "../../../../../actions";

describe("Verify the Developer's Forecast checkbox on the In-Place Rent Roll page", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll", "@check_export" ] }, () => {

    it("Check the Summarize current rent roll checkbox", () => {
        cy.stepInfo("Login, create report");
        createReport(reportCreationData(0));
        _NavigationSection.navigateToPropertySummary();
         Property._Summary.enterNumberOfResUnits(testData.residentialUnits.length);

        cy.stepInfo("1. Navigate to Income > Residential > In-Place Rent Roll");
        _NavigationSection.navigateToResInPlaceRentRoll();
                
        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(reportCreationData(0).reportNumber);
        deleteReport(reportCreationData(0).reportNumber);
    });

    it("Uncheck the Summarize current rent roll checkbox", () => {
        cy.stepInfo("Login, create report");
        createReport(reportCreationData(1));
        _NavigationSection.navigateToPropertySummary();
         Property._Summary.enterNumberOfResUnits(testData.residentialUnits.length);

        cy.stepInfo("1. Navigate to Income > Residential > In-Place Rent Roll");
        _NavigationSection.navigateToResInPlaceRentRoll();

        cy.stepInfo("2. Check the Summarize current rent roll checkbox");
        Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.sumCurrent);
                
        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(reportCreationData(1).reportNumber);
        deleteReport(reportCreationData(1).reportNumber);
    });

    it("Verify export report", () => {
        for (let i = 0; i < 2; i++) {
            Cypress.config().baseUrl = null;
            cy.task("getFilePath", { _reportName: reportCreationData(i).reportNumber, _docx_html: "html" }).then(file => {
                cy.log(<string>file);
                cy.stepInfo("4. Verify the summarize values in the Current Residential Rent Roll table");
                cy.visit(<string>file);

                if (i === 0) {
                    cy.contains("Current Residential Rent Roll").scrollIntoView().next().next().should("not.have.text", testData.verifyText);
                } else {
                    cy.contains("Current Residential Rent Roll").scrollIntoView().next().next().should("have.text", testData.verifyText);
                }
            });
        }
    });
});