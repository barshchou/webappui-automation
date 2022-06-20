import { loginAction } from './../../../actions/base/baseTest.actions';
import { Organization } from './../../../actions/index';
import { _NavigationSection } from './../../../actions/base/index';
import testData from "../../../fixtures/not_full_reports/organizations/QA-5841.fixture";

describe("", 
    { tags:[ "@permissions_roles" ] }, () => {

    it("Test body", () => {

        loginAction(testData.username, testData.password);
        // cy.visit('/');

        _NavigationSection.navigateToProfileOrganization("Organization");
        cy.contains("Create New Client").click();

        Organization._CreateNewClient.createNewClient(testData.clientCreationData);

        cy.contains("Organization Clients").click();
        cy.pause();
        
    });
});