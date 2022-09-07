import { loginAction } from './../../../../actions/base/baseTest.actions';
import { Organization, PreviewEdit } from '../../../../actions';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import enums from '../../../../enums/enums';
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4627.fixture';
import { conditionalDescribe } from "../../../checkIsProd.utils";

// TODO: Test fails on Cover Page. [QA-6751] Check test after WEB-5721 implementation
conditionalDescribe("Verify the functionality of the Client field.", 
    { tags:[ "@report", "@client" ] }, () => {
        beforeEach("Restore state. Create report", () => {
            loginAction();
            cy.stepInfo(`Clean up state before tests run. Delete existing user.`);
            _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
            Organization._OrganizationActions.openOrganizationClientsPage();
            Organization._OrganizationClientsActions.deleteClientIfExists(testData.textToType);

            cy.stepInfo(`Create report.`);
            createReport(testData.reportCreationData);
        });

        it("[QA-4627]", () => {
            cy.stepInfo(`1. Proceed to the Report > Client page.`);
            _NavigationSection.navigateToClientPage();

            cy.stepInfo(`2. Enter first letters and verify that the list of the Clients 
            is displayed (they are taken from the Organization Clients).`);
            Report._Client.verifyProgressBarNotExist()
                .enterClientName("Debbie Gerstner");

            cy.stepInfo(`3. Proceed to the Organization > Create New Client page and create a new client, save it.`);
            Report._Client.clickAddNewClient();
            Organization._CreateNewClient.createNewClient(testData.clientCreationData);

            cy.stepInfo(`4. Proceed to the Report > Client page and verify that a newly created client is 
            added to the list by entering the first letter and can be selected.`);
            cy.go("back");
            Report._Client.verifyProgressBarNotExist()
                .enterClientName(testData.shortTextToType);
            Report._Client.Page.getClientNameField().should("have.value", testData.textToType);

            cy.stepInfo(`5. Verify that the Client can be selected by entering manually 
            the full First and Last name, save it.`);
            Report._Client.enterClientName(testData.textToType);
            Report._Client.Page.getClientNameField().should("have.value", testData.textToType);

            cy.stepInfo(`6. Verify the Client Company is displayed in the Intended User and 
            Identification of the Client section as a chip and to the Client Guidelines Discussion - 
            GC (if the Client has Company added on the Organization > Clients page).`);
            Report._Client.Page.identificationOfClientTextBox.should("contain.text", testData.companyName);

            cy.stepInfo(`7. Proceed to the Preview & Edit > Cover page and verify that 
            the Client from the previous step is displayed in the REQUESTED BY section.`);
            _NavigationSection.navigateToCoverPage();
            PreviewEdit._CoverPage.Page.requestedClientName.should("have.text", testData.textToType);

            cy.stepInfo(`8. Proceed to the Preview & Edit > Letter of Transmittal page and 
            verify that the Client from the previous step is displayed.`);
            _NavigationSection.clickLetterOfTransmittal();
            PreviewEdit._LetterOfTransmittal.verifyContainsValue(testData.textToType);

            cy.stepInfo(`9. Proceed to the Preview & Edit > Introduction page and verify 
            that the Client Company is displayed in the IDENTIFICATION OF THE CLIENT and INTENDED USE & USER sections 
            (if the Client has Company added on the Organization > Clients page).`);
            _NavigationSection.navigateToIntroduction();
            PreviewEdit._Introduction.Page.getIntroductionCommentaryItem(testData.intendedUseAndUser)
                .should('include.text', testData.companyName);
            PreviewEdit._Introduction.Page.getIntroductionCommentaryItem(testData.identificationOfTheClient)
                .should('include.text', testData.companyName);
        });
    });