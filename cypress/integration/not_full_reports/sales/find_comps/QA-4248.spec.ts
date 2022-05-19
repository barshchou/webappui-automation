import Homepage from "../../../../actions/base/homepage.actions";
import fixture from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4248.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../utils/tags.utils";
import { Alias } from "../../../../utils/alias.utils";

describe("Verify the Comps can be added by entering the existing Report ID in the modal", 
{ tags:[ Tag.comp_plex, Tag.sales, Tag.find_comps ] }, () => {
    before("Login, create report", () => {
        createReport(fixture.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales.FindComps.selectCompFromMapByAddress(fixture.comparable.address)
            .clickSaveContinueButton();
        Sales.CreateCompMap.verifyPageOpened();
        cy.get(`@${Alias.reportId}`).then(reportId => {
            cy.log(`Current report ID is ${reportId}`);
            Sales.CreateCompMap.returnToHomePage();
            Homepage.verifyThatPageIsOpened()
                .verifyProgressBarNotExist();
            Homepage.createReport(fixture.reportCreationData);
            NavigationSection.navigateToFindComps();
            Sales.FindComps.clickImportComparableButton()
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .enterReportToSearchComp(<any>reportId);
        });
        Sales.FindComps.clickSearchButton()
            .checkSingleSalesCompsByEventId()
            .selectAllCompsForImport()
            .checkSelectedSingleSalesComps()
            .clickImportCompsFromReportButton();
        Sales.FindComps.verifyAddedCompAddress(fixture.comparable.address);
        deleteReport(fixture.reportCreationData.reportNumber);
        cy.reload();
        Homepage.deleteReport(fixture.reportCreationData.reportNumber);
    });
});