import { Base, Sales } from "../../actions";
import { salesInterceptions } from "../../actions/base/baseTest.actions";

const reportNumber = "TestAutoReport-QA-generate-download";

describe("Open any existing report and open any page", { tags: [ "@smoke" ] }, () => {

    it("Test body", () => {
       cy.loginByApi(Cypress.config().baseUrl);
       salesInterceptions();
       Base._HomePage.clickAllReportsTab()
           .verifyProgressBarNotExist()
           .enterReportNumberToSearch(reportNumber)
           .openReportByName(reportNumber)
           .verifyProgressBarNotExist();
       Base._NavigationSection.navigateToFindComps()
           .verifyProgressBarNotExist();
       Sales._FindComps.Page.pageTitle.should("have.text", "Find Sales Comparables");
       Sales._FindComps.Page.createCompButton.should("exist");
    });
});