import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4169.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Sales } from "../../../../actions";
import { isProdEnv } from "../../../../../utils/env.utils";
import { Tag } from "../../../../utils/tags.utils";

const conditionalDescribe = isProdEnv() ? describe.skip : describe;

conditionalDescribe("Verify the New Comp is created after clicking on 'Save&Close' button on Property Description form", 
{ tags:[ Tag.comp_plex ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("Navigate to FindComps page and create new comp");
        _NavigationSection.navigateToFindComps();
        Sales._FindComps.openAddNewComparableFormSearchResult(testData.compAddress, 1)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition);

        Sales._FindComps
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition);

        Sales._FindComps.Page.newCompContinueButton.should("be.enabled").click();
        Sales._FindComps.selectSource();

        cy.pause();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});