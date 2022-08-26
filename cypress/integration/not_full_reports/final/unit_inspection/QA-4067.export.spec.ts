import testData from "../../../../fixtures/not_full_reports/final/unit_inspection/QA-4067.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Final, Income, ReviewExport } from "../../../../actions";

describe("The default status is 'Average' on the Condition column on the Unit Inspection table", 
    { tags:[ "@final", "@unit_inspection", "@check_export" ] }, () => {

        it("[QA-4067]", () => {
            cy.stepInfo("Login, create report");
            createReport(testData.reportCreationData);

            cy.stepInfo(`1. Proceed to the Income > Commercial or Residential > In-Place RR table and tick 
                        the checkboxes in the Inspected column`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();

            cy.stepInfo(`2.Proceed to the Unit Inspection page and verify:
                        - the default status is "Average" on the Condition column`);
            Income._CommercialManager.InPlaceRentRoll.checkIsInspectedCheckboxByRowNumber()
                .chooseLeaseStatusByRowNumber(testData.leaseStatus);

            cy.stepInfo("3. Verify default condition in Final > Unit Inspection");
            _NavigationSection.navigateToUnitInspection();
            Final._UnitInspection.Page.getConditionValue().should("include.text", testData.defaultValue);

            cy.stepInfo("4. Export report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it(`Check export`, () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo(`5.  proceed to the Inspected Units Summary table > check that the default status 
                                is "Average" on the Condition column.`);
                  
                    cy.xpath("//*[contains(text(), 'Inspected Units Summary')]/following::table[1]").children()
                        .should("include.text", testData.defaultValue);
                });
        });
    });