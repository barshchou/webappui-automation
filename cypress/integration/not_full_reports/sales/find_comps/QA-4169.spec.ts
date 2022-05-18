import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4169.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Sales } from "../../../../actions";
import { isProdEnv } from "../../../../../utils/env.utils";
import { Tag } from "../../../../utils/tags.utils";

const conditionalDescribe = isProdEnv() ? describe.skip : describe;

conditionalDescribe("Verify the New Comp is created after clicking on 'Save&Close' button on Property Description form", 
{ tags:[ Tag.comp_plex, Tag.find_comps, Tag.sales ] }, () => {

    before(`
    Click on the Create Comp button > Enter New Comparable Address > 
    Select the Address from the Search Results 
    and click on the Create New button to proceed to the Enter Property Information form. 
    - Fill in all required fields and click on the Continue button 
    to proceed to the Enter Sale Information form.
    - Fill in all required fields and click on the Continue button 
    to proceed to the Enter Property Description form`, () => {
        createReport(testData.reportCreationData);

        _NavigationSection.navigateToFindComps();
        Sales._FindComps.openAddNewComparableFormSearchResult(testData.compAddress, 1)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition);
        Sales._FindComps
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition);
        Sales._FindComps.Page.newCompContinueButton.should("be.enabled").click();
        Sales._FindComps.selectDropdownOptionNewComp(
            Sales._FindComps.Page.SourceInput, "Bowery Subject"
        );
        Sales._FindComps.Actions.SaleInfo.selectSaleDate();
        Sales._FindComps.Page.newCompContinueButton.should("be.enabled").click();
    });

    it("Test body", () => {
        cy.pause();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});