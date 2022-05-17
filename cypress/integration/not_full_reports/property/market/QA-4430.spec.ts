import testData from "../../../../fixtures/not_full_reports/property/market/QA-4430.fixture";
import { Base, Property, ReviewExport } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../utils/tags.utils";
import { _NavigationSection } from "../../../../actions/base";


describe("Verify the functionality of the Ceiling Height radio button", 
    { tags:[ Tag.property, Tag.market, Tag.check_export ] }, () => {

    it("Test body", () => {
        createReport(testData.reportCreationData);

        cy.stepInfo("1. Navigate to Property -> Market");
        Base._NavigationSection.navigateToPropertyMarket();

        cy.stepInfo("2. Verify exposure time description with default exposure time is displayed");
        Property._Market.verifyExposureTimeMin(testData.minExposureTimeDefault)
            .verifyExposureTimeMax(testData.maxExposureTimeDefault)
            .verifyExposureTimeDescription(testData.exposureTimeDescriptionDefault);
        
        cy.stepInfo("3. Verify that the [Exposure Time Min] and [Exposure Time Max] are dynamic chips");
        Property._Market.updateExposureTimeMin(testData.customMinExposureTime)
            .updateExposureTimeMax(testData.customMaxExposureTime)
            .verifyExposureTimeDescription(testData.exposureTimeDescriptionCustom)
            .clickSaveButton();

        cy.stepInfo("4. Prepare report for export validation");
         _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport()
            .waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        deleteReport(testData.reportCreationData.reportNumber);

    });

    it("Check exported document other utilities values and commentaries", () => {
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" })
        .then(file => {
            cy.stepInfo(`5. Verify that the commentary exports in the Introduction as a sentence in the Introduction > Exposure Time section `);
            cy.log(<string>file);
            cy.visit(<string>file);
            cy.xpath("//h2[text() = 'Exposure Time']/following-sibling::p").eq(0).should("have.text", testData.exposureTimeDescriptionCustom);
        });
    });
});