import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4426.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../utils/tags.utils";
import { _NavigationSection } from "../../../../actions/base";
import { reportCreationFixture } from "../../../../fixtures/not_full_reports/report/key_info/QA-4426.fixture";
import { Report, ReviewExport } from '../../../../actions';


describe("[QA-4426] Check the generated commentary for Property Rights Appraised Discussion", 
    { tags:[ Tag.report, Tag.key_info, Tag.check_export ] }, () => {
    it("Test body", () => {
        testData.reportConclusionAndTextValues.forEach((item, index) => {
            cy.stepInfo(`${index + 1}. Login, create report`);
            createReport(reportCreationFixture(item.reportConclusion, `_${index + 1}`));

            cy.stepInfo("1. Report > Key Info");
            _NavigationSection.navigateToReportInformation();
            Report._KeyInfo.clickYesButton();

            cy.stepInfo("2. Verify that the generated commentary for Property Rights Appraised discussion is a next-gen component");
            Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("include.text", item.reportConclusionText);

            cy.stepInfo("3. Verify that the interest appraised elements of the generated commentary (highlighted in red) are chips");
            Report._KeyInfo.Page.textBoxPropertyRightsAppraised.contains(item.check).trigger("mouseover");
            Report._KeyInfo.verifyTooltipExist();

            cy.stepInfo(`4. Verify that the Property Rights Appraised  discussion appears below the h2 Introduction > Property Rights 
                Appraised section in the exported report.`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(reportCreationFixture(item.reportConclusion, `_${index + 1}`).reportNumber);
            deleteReport(reportCreationFixture(item.reportConclusion, `_${index + 1}`).reportNumber);
        });
    }); 
    
    it("Check export", () => {
        testData.reportConclusionAndTextValues.forEach((item, index) => {
            cy.task("getFilePath", { _reportName:reportCreationFixture(item.reportConclusion, `_${index + 1}`).reportNumber, _docx_html: "html" }).then(file => {
                cy.log(<string>file);
                cy.visit(<string>file);
                cy.contains("Property Rights Appraised").next().scrollIntoView().should("include.text", item.check);
            });
        });
    });
});
