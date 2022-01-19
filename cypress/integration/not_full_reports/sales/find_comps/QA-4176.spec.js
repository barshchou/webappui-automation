import Homepage from "../../../../actions/base/homepage.actions";
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4176.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import {isProdEnv} from "../../../../../utils/env.utils";

/**
 * This test can be launched only at PROD environment due to changes of import modal functionality at STAGING and DEV
 */
const modifiedDescribe = isProdEnv() ? describe : describe.skip;

modifiedDescribe("Verify the Comps can be added by entering the existing Report URL in the modal", () => {
    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales.FindComps.selectCompFromMapByAddress(testData.comparable.address)
            .clickSaveContinueButton();
        Sales.CreateCompMap.verifyPageOpened();
        cy.url().then(url => {
            const reportURL = url.replace("/sales-comps-map", "");
            cy.log(`Current report URL is ${reportURL}`);
            Sales.CreateCompMap.returnToHomePage();
            Homepage.verifyThatPageIsOpened()
                .verifyProgressBarNotExist();
            Homepage.createReport(testData.reportCreationData);
            NavigationSection.navigateToFindComps();
            Sales.FindComps.clickImportComparableButton()
                .enterReportToSearchComp(reportURL);
        });
        Sales.FindComps.clickImportCompsFromReportButton();
        Sales.FindComps.verifyAddedCompAddress(testData.comparable.address)
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
        cy.reload();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});