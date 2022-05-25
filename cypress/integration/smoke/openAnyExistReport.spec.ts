import { getEnvUrl } from "../../../utils/env.utils";
import { Base, Sales } from "../../actions";
import { salesInterceptions } from "../../actions/base/baseTest.actions";

describe("Open any existing report and open any page", { tags: [ "@smoke" ] }, () => {

    it("Test body", () => {
       cy.loginByApi(getEnvUrl());
       salesInterceptions();
       Base._HomePage.openReportByIndex(3)
           .verifyProgressBarNotExist();
       Base._NavigationSection.navigateToFindComps()
           .verifyProgressBarNotExist();
       Sales._FindComps.Page.pageTitle.should("have.text", "Find Sales Comparables");
       Sales._FindComps.Page.createCompButton.should("exist");
    });
});