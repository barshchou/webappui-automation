import { Report } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/client/QA-6592.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _HomePage, _NavigationSection } from "../../../../actions/base";

describe("Verify the display of the Clients column", 
    { tags: [ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);

            cy.stepInfo("1. Navigate to the Report > Client page");
            _NavigationSection.navigateToClientPage();
        });

        it("[QA-6592]", () => {
            cy.stepInfo("2. Fill the 'Client' field and click 'Add additional client");
            Report._Client.enterClientName(testData.clientName)
                .clickAddAdditionalClientBtn(0);

            cy.stepInfo("3. Fill the Client 2 field with any valid data");
            Report._Client.enterClientName(testData.clientName, 1)
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`4. Navigate to the Report Dashboard page and verify in 'Clients' column the Client 
                        organizations are displayed truncated and separated by a comma 
                        (e.g. “<client1orgname>, <cli…”).`);
            Report._Client.returnToHomePage();

            _HomePage.filterReportsByReportNumber(testData.reportCreationData.reportNumber);
            cy.contains(testData.organizationCLientName).should("exist");
        });

    });