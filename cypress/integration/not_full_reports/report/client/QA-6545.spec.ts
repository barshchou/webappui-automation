import { Organization, Report } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/client/QA-6545.fixture";
import { createReport, loginAction } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import Enums from '../../../../enums/enums';
import { conditionalDescribe } from '../../../checkIsProd.utils';

conditionalDescribe("Newly created client is displayed for a Client 2, Client 3 and Client 4 fields", 
    { tags: [ "@report", "@client" ] }, () => {
        beforeEach("Restore state. Create report", () => {
            loginAction();
            cy.stepInfo(`Clean up state before tests run. Delete existing user.`);
            _NavigationSection.navigateToProfileOrganization(Enums.MENU_LINKS.organization);
            Organization._OrganizationActions.openOrganizationClientsPage();
            Organization._OrganizationClientsActions.deleteClientIfExists(testData.addedClient);

            cy.stepInfo(`Create report.`);
            createReport(testData.reportCreationData);

            cy.stepInfo("1. Navigate to the Report > Client page");
            _NavigationSection.navigateToClientPage();
        });

        it("[QA-6545]", () => {
            cy.stepInfo("2. Fill the 'Client' field  and click 'Add additional client");
            Report._Client.enterClientName(testData.clientName);

            cy.stepInfo("3. Click on the 'Add' button in the callout");
            Report._Client.clickSaveButton()
                .clickAddNewClient();

            cy.stepInfo("4. On the organization page, create a new 3 clients and save it");
            Organization._CreateNewClient.createNewClient(testData.clientCreationData);
            
            cy.stepInfo("5. Proceed back to the Report > Client page and Click on the 'Add Additional Client' button");
            cy.go("back");
            for (let i = 0; i < 3; i++) {
                Report._Client.clickAddAdditionalClientBtn();
            }

            cy.stepInfo(`6. Verify in the Client X field enter the name of the newly created client and select it`);
            for (let i = 0; i < 3; i++) {
                Report._Client.selectClient(testData.enterAddedClient, testData.addedClient, i + 1);
            }

            cy.stepInfo("7. Click Save changes button");
            Report._Client.clickSaveButton()
                .verifyProgressBarNotExist();
        });

    });