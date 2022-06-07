import { reportCreationData } from '../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4210.fixture';
import { _NavigationSection } from './../../../../../actions/base/index';
import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4210.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Income, Property, ReviewExport } from "../../../../../actions";

describe("Verify the Developer's Forecast checkbox on the In-Place Rent Roll page", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll", "@check_export" ] }, () => {

    it("Test body", () => {
        for (let i = 0; i < 2; i++) {
            cy.stepInfo("Login, create report");
            createReport(reportCreationData(i));
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.residentialUnits.length);

            cy.stepInfo("1. Navigate to Income > Residential > In-Place Rent Roll");
            _NavigationSection.navigateToResInPlaceRentRoll();

            cy.stepInfo("2. Check the Summarize current rent roll checkbox");
            if (i === 1) {
                Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.sumCurrent);
            }
                
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(reportCreationData(i).reportNumber);
            deleteReport(reportCreationData(i).reportNumber);
        }
    });

    it("Verify export report", () => {
        for (let i = 0; i < 2; i++) {
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