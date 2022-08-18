import testData from "../../../../fixtures/not_full_reports/final/source_information/QA-6036.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Final, Report, ReviewExport } from "../../../../actions";
import { normalizeText } from "../../../../../utils/string.utils";


describe("Generated Commentary is dynamically updated with relevant information (not-Freddie Mac report)", 
    { tags:[ "@final", "@source_information", "@check_export" ] }, () => {

        it("[QA-6036]", () => {
            cy.stepInfo("Login, create report");
            createReport(testData.createReportData);

            cy.stepInfo("1. Go to Report > Appraiser page");
            _NavigationSection.navigateToReportAppraiser();

            cy.stepInfo(`2. Click Add Appraiser / Inspector button → Add Appraiser / Inspector modal appears 
                        (Bowery Appraiser/Inspector radio button is set by default) and add Inspector`);
            Report._Appraiser.searchAndAddAppraiser(testData.inspectorName, true);

            cy.stepInfo(`3. Verify that External Inspector was added to Appraisers table (Personally Inspected 
                        checkbox is checked by default)`);
            Report._Appraiser.verifyPersonallyInspectedCheckbox(testData.inspectorName, true);

            cy.stepInfo("4. Navigate to Final > Source Information page");
            _NavigationSection.navigateToSourceInformation();

            cy.stepInfo("5. Verify generated commentary");
            Final._SourceInformation.Page.formCommentTextBox(testData.textBoxName).invoke("text").then(text => {
                const normalText = normalizeText(text);
                cy.log(normalText);
                expect(normalText).to.eq(testData.generatedComment);
            });

            cy.stepInfo("6. Export the report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.createReportData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath",
                { _reportName: testData.createReportData.reportNumber, _docxHtml: "html" }
            ).then(file => {
                cy.log(<string>file);
                cy.visit(<string>file);
            
                cy.contains("Data Sources").next().scrollIntoView().should("have.text", testData.generatedComment);
            });
        });
    });