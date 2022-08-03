import testData from 
    "../../../../../../fixtures/not_full_reports/income/residential/rent_comps/full_building_comps/QA-4375_76.fixture";
import { createReport } from "../../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../../actions/base";
import { Income } from "../../../../../../actions";
import { _IncomeTitles } from "../../../../../../enums/pages_titles";
import { conditionalDescribe } from "../../../../../checkIsProd.utils";

conditionalDescribe("Comp summary tests", { tags: [ "@residential", "@rent_comps",
    "@full_building_comps", "@comp_summary", "@snapshot_tests" ] }, () => {

    before("Create report, navigate to page", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToRentComps();
        cy.stepInfo("1. Add comparable, click edit button, open comp summary");
        Income._Residential.RentComps.BaseActions.changeToBuildingSearch()
            .clickAddRemoveBuildingCompByAddress(testData.compAddress)
            .clickEditBuildingCompButtonByAddress(testData.compAddress);
        _NavigationSection.submitSaveChangesModal();
        Income._Residential.RentComps.FullBuildingComps._CompSummary.openNavigationTab();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("[QA-4375] The default state of the Comp Summary page", () => {
        Income._Residential.RentComps.FullBuildingComps._CompSummary.matchElementSnapshot(
            Income._Residential.RentComps.FullBuildingComps._CompSummary.Page.compSummaryForm, testData.snapshotName);
    });

    it("[QA-4376] Verify the Unit Mix button on the Comp Summary page", () => {
        Income._Residential.RentComps.FullBuildingComps._CompSummary.clickUnitMixButton();
        Income._Residential.RentComps.FullBuildingComps._UnitMix.Page.pageTitle.should("exist")
            .and("have.text", _IncomeTitles._Residential.UNIT_MIX);
    });
});
