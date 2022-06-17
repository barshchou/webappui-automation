import testData from "../../../../../../fixtures/not_full_reports/income/residential/rent_comps/full_building_comps/QA-4375_76.fixture";
import { isProdEnv } from "../../../../../../../utils/env.utils";
import { createReport, deleteReport } from "../../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../../actions/base";
import { Income } from "../../../../../../actions";
import { _IncomeTitles } from "../../../../../../enums/pages_titles";

const conditionalDescribe = isProdEnv() ? describe.skip : describe;

conditionalDescribe("Comp summary tests", { tags: [ "@residential", "@rent_comps",
        "@full_building_comps", "@comp_summary" ] }, () => {

    before("Create report, navigate to page", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToRentComps();
        Income._Residential.RentComps.BaseActions.changeToBuildingSearch()
            .clickAddRemoveBuildingCompByAddress(testData.compAddress)
            .clickEditBuildingCompButtonByAddress(testData.compAddress);
        _NavigationSection.clickYesIfExist();
        Income._Residential.RentComps.FullBuildingComps.CompSummary.openNavigationTab();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("[QA-4375] The default state of the Comp Summary page", () => {
        Income._Residential.RentComps.FullBuildingComps.CompSummary.matchElementSnapshot(
            Income._Residential.RentComps.FullBuildingComps.CompSummary.Page.compSummaryForm, testData.snapshotName);
    });

    it("[QA-4376] Verify the Unit Mix button on the Comp Summary page", () => {
        Income._Residential.RentComps.FullBuildingComps.CompSummary.clickUnitMixButton();
        Income._Residential.RentComps.FullBuildingComps.UnitMix.Page.pageTitle.should("exist")
            .and("have.text", _IncomeTitles._Residential.UNIT_MIX);
    });

    after(() => {
        deleteReport(testData.reportCreationData.reportNumber);
    });
});