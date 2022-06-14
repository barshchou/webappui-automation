import { Base, Sales } from "../../actions";
import { salesInterceptions } from "../../actions/base/baseTest.actions";
import { _SalesTitles } from "../../enums/pages_titles";

const reportNumber = "TestAutoReport-QA-generate-download";

describe("Open any existing report and open any page", { tags: [ "@smoke" ] }, () => {

    it("Test body", () => {
       cy.loginByApi(
           Cypress.config().baseUrl, 
           Cypress.env("USERNAME"), 
           Cypress.env("PASSWORD")
        );
       salesInterceptions();
       Base._HomePage.clickAllReportsTab()
           .verifyProgressBarNotExist()
           .enterReportNumberToSearch(reportNumber)
           .openReportByName(reportNumber)
           .verifyProgressBarNotExist();
       Base._NavigationSection.navigateToFindComps()
           .verifyProgressBarNotExist();
       Sales._FindComps.Page.pageTitle.should("have.text", _SalesTitles.FIND_COMPS);
       Sales._FindComps.Page.createCompButton.should("exist");
    });
});