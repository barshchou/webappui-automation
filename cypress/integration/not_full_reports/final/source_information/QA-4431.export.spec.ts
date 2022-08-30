import testData from "../../../../fixtures/not_full_reports/final/source_information/QA-4431.fixture";
import { createReport, loginAction } from "../../../../actions/base/baseTest.actions";
import { _HomePage, _NavigationSection } from "../../../../actions/base";
import { Final, ReviewExport } from "../../../../actions";
import { normalizeText } from "../../../../../utils/string.utils";

describe("Verify that the generated commentary for Data Sources Description is a next-gen component", 
    { tags:[ "@final", "@source_information", "@check_export" ] }, () => {

        it("[QA-4431] NYC Report", () => {
            cy.stepInfo("Login, create report");
            createReport(testData.nycReport);

            cy.stepInfo("1. Navigate to Final > Source Information page");
            _NavigationSection.navigateToSourceInformation();

            cy.stepInfo("2. Verify NYC properties commentary");
            Final._SourceInformation.Page.formCommentTextBox(testData.textBoxName).invoke("text").then(text => {
                const normalText = normalizeText(text);
                cy.log(normalText);
                expect(normalText).to.eq(testData.nycComment);
            });

            cy.stepInfo(`3. Verify that the interest appraised elements of the generated
                         commentary (highlighted in red) are chips`);
            testData.chipNames.forEach(chip => {
                Final._SourceInformation.Page.getCommentChip(chip).should("have.css", "color", testData.color)
                    .and("have.css", "background-color", testData.backgroundColor);
            });

            cy.stepInfo("4. Export the report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.nycReport.reportNumber);
        });

        it("Check export NYC report", () => {
            cy.task("getFilePath",
                { _reportName: testData.nycReport.reportNumber, _docxHtml: "html" }
            ).then(file => {
                cy.log(<string>file);
                cy.visit(<string>file);
            
                cy.contains("Data Sources").next().scrollIntoView().should("have.text", testData.nycComment);
            });
        });

        it("[QA-4431] Other report", () => {
            cy.stepInfo("Login, create report");
            loginAction();
            _HomePage.createReport(testData.otherReport);

            cy.stepInfo("1. Navigate to Final > Source Information page");
            _NavigationSection.navigateToSourceInformation();

            cy.stepInfo("2. Verify Other properties commentary");
            Final._SourceInformation.Page.formCommentTextBox(testData.textBoxName).invoke("text").then(text => {
                const normalText = normalizeText(text);
                cy.log(normalText);
                expect(normalText).to.eq(testData.otherComment);
            });

            cy.stepInfo(`3. Verify that the interest appraised elements of the generated
                         commentary (highlighted in red) are chips`);
            testData.chipNames.forEach(chip => {
                Final._SourceInformation.Page.getCommentChip(chip).should("have.css", "color", testData.color)
                    .and("have.css", "background-color", testData.backgroundColor);
            });

            cy.stepInfo("4. Export the report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.otherReport.reportNumber);
        });

        it("Check export other report", () => {
            cy.task("getFilePath",
                { _reportName: testData.otherReport.reportNumber, _docxHtml: "html" }
            ).then(file => {
                cy.log(<string>file);
                cy.visit(<string>file);
            
                cy.contains("Data Sources").next().scrollIntoView().should("have.text", testData.otherComment);
            });
        });
    });