import { Report, ReviewExport } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/client/QA-6593_96.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";

describe("Verify the display of the multiple clients on the Cover page on export", 
    { tags: [ "@report", "@client", "@check_export" ] }, () => {

        it("[QA-6593_96]", () => {
            cy.stepInfo("Login, create report");
            createReport(testData.reportCreationData);

            cy.stepInfo("1. Navigate to the Report > Client page");
            _NavigationSection.navigateToClientPage();

            cy.stepInfo("2. Fill the 'Client', 'Client number' and 'NYCB number' field");
            Report._Client.enterClientName(testData.clientNames[0])
                .enterClientFileNumber(testData.clientFileNumbers[0])
                .enterNycbApplicationNumber(testData.nycbNumber);

            cy.stepInfo("3. Click 3 times 'Add additional client");
            for (let i = 0; i < 3; i++) {
                Report._Client.clickAddAdditionalClientBtn();(testData.nycbNumber, i + 1);
            }

            cy.stepInfo(`4. Fill in the Client X field and NYCB Application Number for both clients fields with 
                any valid data, and save the page`);
            for (let i = 0; i < 3; i++) {
                Report._Client.enterClientName(testData.clientNames[i + 1], i + 1)
                    .enterClientFileNumber(testData.clientFileNumbers[i + 1], i + 1)
                    .enterNycbApplicationNumber(testData.nycbNumber, i + 1);
            }

            cy.stepInfo("5. Export report");
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it(`Check export`, () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo(`6. The NYCB Application No. for client 1, the NYCB Application No. for client 2, 
                                the NYCB Application No. for client 3 and the NYCB Application No. 
                                for client 4 are displayed and separated by a comma`);

                    cy.xpath("//*[contains(text(), 'NYCB Application No.')]").invoke("text").then(text => {
                        const nycbArray = text.split(',');
                        nycbArray.forEach(number => {
                            expect(number).to.include(testData.nycbNumber);
                        });
                    });

                    cy.stepInfo(`7. Client 1 with organization info, Client 2 with organization info, Client 3 with
                                organization info and Client 4 with organization info are displayed. Client File Numbers
                                are displayed as Project No and separated by a comma.The Client Guidelines Discussion 
                                mirrors the Report > Client > Client Guidelines Discussio`);

                    cy.xpath("//*[contains(text(), 'Requested By')]/following::tbody[1]").invoke("text").then(text => {
                        testData.clientNames.forEach(name => {
                            expect(text).to.include(name);
                        });
                    });

                    cy.xpath("//*[contains(text(), 'Project No')]").invoke("text").then(text => {
                        testData.clientFileNumbers.forEach(number => {
                            expect(text).to.include(number);
                        });
                    });

                    cy.xpath("//*[contains(text(), 'Our analyses, opinions')][1]").invoke("text").then(text => {
                        testData.organizationNames.forEach(name => {
                            expect(text).to.include(name);
                        });
                    });
                });
        });
    });