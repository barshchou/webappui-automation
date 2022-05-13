import Homepage from "../../../../actions/base/homepage.actions";
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4248.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../utils/tags.utils";
import { Alias } from "../../../../utils/alias.utils";

describe("Verify the Comps can be added by entering the existing Report ID in the modal", 
{ tags:[ Tag.comp_plex, Tag.sales, Tag.find_comps ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales.FindComps.selectCompFromMapByAddress(testData.comparable.address)
            .clickSaveContinueButton();
        Sales.CreateCompMap.verifyPageOpened();
        cy.get(`@${Alias.reportId}`).then(reportId => {
            cy.log(`Current report ID is ${reportId}`);
            Sales.CreateCompMap.returnToHomePage();
            Homepage.verifyThatPageIsOpened()
                .verifyProgressBarNotExist();
            Homepage.createReport(testData.reportCreationData);
            NavigationSection.navigateToFindComps();
            Sales.FindComps.clickImportComparableButton()
                .enterReportToSearchComp(<any>reportId);
        });
        Sales.FindComps.clickSearchButton()
            .selectAllCompsForImport()
            .clickImportCompsFromReportButton();
        Sales.FindComps.verifyAddedCompAddress(testData.comparable.address);
        // cy.get("@salesEventId").then(val => {
        //     cy.log(<any>val);
        // });
        cy.pause();
        deleteReport(testData.reportCreationData.reportNumber);
        cy.reload();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});