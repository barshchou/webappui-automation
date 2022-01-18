import Homepage from "../../../../actions/base/homepage.actions";
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4175.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import {getEnvUrl, isProdEnv} from "../../../../../utils/env.utils";

describe("Verify the Comps can be added by entering the existing Report ID in the modal", () => {
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
            const reportID = url.replace("/sales-comps-map", "").replace(`${getEnvUrl()}/report/`, "");
            cy.log(`Current report ID is ${reportID}`);
            Sales.CreateCompMap.returnToHomePage();
            Homepage.verifyThatPageIsOpened()
                .verifyProgressBarNotExist();
            Homepage.createReport(testData.reportCreationData);
            NavigationSection.navigateToFindComps();
            Sales.FindComps.clickImportComparableButton()
                .enterReportToSearchComp(reportID);
        });
        if (isProdEnv()) {
            Sales.FindComps.clickImportCompsFromReportButton();
        } else {
            Sales.FindComps.clickSearchButton()
                .selectAllCompsForImport()
                .clickImportCompsFromReportButton();
        }
        Sales.FindComps.verifyAddedCompAddress(testData.comparable.address)
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
        cy.reload();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});