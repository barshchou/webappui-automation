import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4169.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Sales } from "../../../../actions";
import { Tag } from "../../../../utils/tags.utils";

/**
 * ernst: when we will be able to delete SalesComps - use this instead of `describe`
 */
// const conditionalDescribe = isProdEnv() ? describe.skip : describe;

describe.skip("Verify the New Comp is created after clicking on 'Save&Close' button on Property Description form", 
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
        Sales._FindComps.Actions.selectDropdownOptionNewComp(
            Sales._FindComps.Page.SourceInput, "Bowery Subject"
        );
        Sales._FindComps.Actions.selectSaleDate();
        Sales._FindComps.Page.newCompContinueButton.should("be.enabled").click();
    });

    it("Test body", () => {
        /**
         * ernst: add steps only after
         */
        cy.stepInfo(`
        1. Verify New Comp is created after clicking on the "Save&Close" button on the Property description modal during creating a new comp 
        > The "Creating a new comp" modal is closed after the user clicks on the "Save&Close" button;
        `);
        // code

        cy.stepInfo(`
        2. Verify New Comp is added to Selected Comparables Table;
        `);
        // code

        cy.stepInfo(`
        3. Verify New Comp is added to Search Results list on the left side from Map;
        `);
        // code

        cy.stepInfo(`
        4. Verify New Comp is displayed in Search Results modal during the searching address
        `);
        // code

        deleteReport(testData.reportCreationData.reportNumber);
    });
});