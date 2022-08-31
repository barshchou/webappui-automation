import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4426.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { reportCreationFixture } from "../../../../fixtures/not_full_reports/report/key_info/QA-4426.fixture";
import { Report, ReviewExport } from '../../../../actions';
import Enums from "../../../../enums/enums";

describe("[QA-4426] Check the generated commentary for Property Rights Appraised Discussion", 
    { tags:[ "@report", "@key_info", "@check_export" ] }, () => {
        it("Test body", () => {
            testData.reportConclusionAndTextValues.forEach((item, index) => {
                cy.stepInfo(`${index + 1}. Login, create report`);
                createReport(reportCreationFixture(item.reportConclusion, `_${index + 1}`));

                // TODO: [QA-6759] AQA - Remove duplicate navigation to KeyInfo page
                cy.stepInfo(`1. Report > Key Info`);
                _NavigationSection.navigateToReportKeyInfo();

                cy.stepInfo(`2. Verify that the generated commentary for Property Rights Appraised 
                discussion is a next-gen component`);
                Report._KeyInfo.Page.formCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.propertyRightsAppraised)
                    .should("include.text", item.reportConclusionText);

                cy.stepInfo(`3. Verify that the interest appraised elements of the generated commentary 
                (highlighted in red) are chips`);
                Report._KeyInfo.Page.formCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.propertyRightsAppraised)
                    .contains(item.check).should("have.css", "color", testData.color);

                cy.stepInfo(`4. Verify that the Property Rights Appraised  discussion appears below 
                            the h2 Introduction > Property Rights 
                            Appraised section in the exported report.`);
                _NavigationSection.openReviewAndExport();
                ReviewExport.generateDocxReport().waitForReportGenerated()
                    .downloadAndConvertDocxReport(
                        reportCreationFixture(item.reportConclusion, `_${index + 1}`).reportNumber);
            });
        }); 
    
        it("Check export", () => {
            testData.reportConclusionAndTextValues.forEach((item, index) => {
                cy.task("getFilePath", { 
                    _reportName: reportCreationFixture(item.reportConclusion, `_${index + 1}`).reportNumber, 
                    _docxHtml: "html" 
                }).then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.contains(testData.exportSectionName).next().scrollIntoView().should("include.text", item.check);
                });
            });
        });
    });
