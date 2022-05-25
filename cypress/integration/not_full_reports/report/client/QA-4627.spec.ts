import { Tag } from './../../../../utils/tags.utils';
import { isProdEnv } from './../../../../../utils/env.utils';
import { Organization, PreviewEdit } from './../../../../actions/index';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4627.fixture';

const conditionalDescribe = isProdEnv() ? describe.skip : describe;

conditionalDescribe("[QA-4627] Verify the functionality of the Client field.", 
    { tags:[ Tag.report, Tag.client ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
     });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Report > Client page.");
        _NavigationSection.navigateToClientPage();

        cy.stepInfo("2. Enter first letters and verify that the list of the Clients is displayed (they are taken from the Organization Clients).");
        Report._Client.verifyProgressBarNotExist()
            .enterClientName("Debbie Gerstner");

        cy.stepInfo("3. Proceed to the Organization > Create New Client page and create a new client, save it.");
        Report._Client.Page.addNewClient.click();
        Organization._CreateNewClient.createNewClient(testData.clientCreationData);

        cy.stepInfo(`4. Proceed to the Report > Client page and verify that a newly created client is 
            added to the list by entering the first letter and can be selected.`);
        cy.go("back");
        Report._Client.verifyProgressBarNotExist()
            .enterClientName(testData.shortTextToType);
        Report._Client.Page.clientNameField.should("have.value", testData.textToType);

        cy.stepInfo("5. Verify that the Client can be selected by entering manually the full First and Last name, save it.");
        Report._Client.enterClientName(testData.textToType);
        Report._Client.Page.clientNameField.should("have.value", testData.textToType);

        cy.stepInfo(`6. Verify the Client Company is displayed in the Intended User and Identification of the Client section as a chip and to the 
            Client Guidelines Discussion - GC (if the Client has Company added on the Organization > Clients page).`);
        Report._Client.Page.identificationOfClientTextBox.should("contain.text", testData.companyName);

        cy.stepInfo("7. Proceed to the Preview & Edit > Cover page and verify that the Client from the previous step is displayed in the REQUESTED BY section.");
        _NavigationSection.navigateToCoverPage();
        PreviewEdit._CoverPage.Page.requestedClientName.should("have.text", testData.textToType);

        cy.stepInfo("8. Proceed to the Preview & Edit > Letter of Transmittal page and verify that the Client from the previous step is displayed.");
        _NavigationSection.clickLetterOfTransmittal();
        PreviewEdit._LetterOfTransmittal.verifyContainsValue(testData.textToType);

        cy.stepInfo(`9. Proceed to the Preview & Edit > Introduction page and verify that the Client Company is displayed in the IDENTIFICATION 
            OF THE CLIENT and INTENDED USE & USER sections (if the Client has Company added on the Organization > Clients page).`);
        _NavigationSection.navigateToProfileOrganization(testData.profileOrganizationName);
        cy.contains("Organization Clients").click();
        Organization._OrganizationClientsActions.deleteClient(testData.textToType);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});