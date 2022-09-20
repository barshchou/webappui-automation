import testData from "../../../../fixtures/not_full_reports/property/market/QA-4430_42.fixture";
import { Base, Property, ReviewExport } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";


describe("Verify the functionality of the Ceiling Height radio button", 
    { tags:[ "@property", "@market", "@check_export" ] }, () => {
        it("Test body", () => {
            createReport(testData.reportCreationData);

            cy.stepInfo("1. Navigate to Property -> Market");
            Base._NavigationSection.navigateToPropertyMarket();

            cy.stepInfo("2. Verify exposure time description with default exposure time is displayed");
            Property._Market.verifyExposureTimeMin(testData.minExposureTimeDefault)
                .verifyExposureTimeMax(testData.maxExposureTimeDefault)
                .verifyExposureTimeDescription(testData.exposureTimeDescriptionDefault);
        
            cy.stepInfo("3. [QA-4430] Verify that the [Exposure Time Min] and [Exposure Time Max] are dynamic chips");
            Property._Market.updateExposureTimeMin(testData.customMinExposureTime)
                .updateExposureTimeMax(testData.customMaxExposureTime)
                .verifyExposureTimeDescription(testData.exposureTimeDescriptionCustom);

            cy.stepInfo("4. [QA-4442] Verify the 'Marketing Time Description' generated");
            Property._Market.checkIncludeMarketingTimeDescription()
                .updateMarketingTimeMin(testData.customMinMarketingTime)
                .updateMarketingTimeMax(testData.customMaxMarketingTime)
                .verifyMarketTimeDescription(testData.marketingTimeDescriptionCustom)
                .clickSaveButton();

            cy.stepInfo("5. [QA-4430] [QA-4442] Prepare report for export validation");
            _NavigationSection.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport()
                .waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        });

        it("Check export document other utilities values and commentaries", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);

                    cy.stepInfo(`6. [QA-4430] Verify that the commentary exports in the Introduction 
                                as a sentence in the Introduction > Exposure Time section `);
                    cy.xpath(`//h2[text() = '${testData.exposureTimeSection}']/following-sibling::p`).eq(0)
                        .should("have.text", testData.exposureTimeDescriptionCustom);

                    cy.stepInfo(`7. [QA-4442] Verify that the commentary exports in the Introduction 
                                as a sentence in the Introduction > Exposure Time section `);
                    cy.xpath(`//h2[text() = '${testData.marketingTimeSection}']/following-sibling::p`).eq(0)
                        .should("have.text", testData.marketingTimeDescriptionCustom);
                });
        });
    });