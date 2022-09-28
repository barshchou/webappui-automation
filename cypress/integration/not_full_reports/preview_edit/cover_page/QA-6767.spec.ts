import { PreviewEdit, Report } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import testData from "../../../../fixtures/not_full_reports/review_edit/cover_page/QA-6767.fixture";

describe("Verify the display of the multiple clients on the Cover page",
    { tags: [ "@preview_edit", "@cover_page" ] }, () => {

        beforeEach("Login, create a report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-6767]", () => {
            cy.stepInfo("1. Navigate to Report > Client add 4 additional clients and fill all inputs");
            _NavigationSection.navigateToClientPage();

            testData.inputValues.forEach((value, index) => {
                Report._Client.enterClientName(value.clientName, index)
                    .enterClientFileNumber(value.clientFileNumber, index)
                    .enterNycbApplicationNumber(value.nycbNumber, index)
                    .clickAddAdditionalClientBtn(index);
            });

            cy.stepInfo("2. Proceed to the Preview & Edit > Cover page");
            _NavigationSection.navigateToCoverPage();

            cy.stepInfo(`3. Verify -The NYCB Application No. for client 1, the NYCB Application No. 
                        for client 2 and NYCB Application No. for client 3 are displayed and separated by a comma;
                        - Client 1 with organization info, Client 2 with organization info and Client 3 
                        with organization info are displayed;`);
            testData.inputValues.forEach((value, index) => {
                PreviewEdit._CoverPage.verifyRequestedRow(testData.applicationNumber, value.nycbNumber)
                    .verifyRequestedRow(testData.clientName, value.clientName, index)
                    .verifyRequestedRow(testData.client, value.organization, index);
            });
        });
    });
