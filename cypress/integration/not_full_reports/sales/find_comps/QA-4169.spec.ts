import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4169.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Sales } from "../../../../actions";

/**
 * ernst: when we will be able to delete SalesComps - use this instead of `describe`
 * TODO: Add actions to QA-4169 test after functionality for SalesComp removal will be added.
 */

describe.skip("Verify the New Comp is created after clicking on 'Save&Close' button on Property Description form", 
    { tags:[ "@comp_plex", "@find_comps", "@sales" ] }, () => {
        before(`Click on the Create Comp button > Enter New Comparable Address > 
        Select the Address from the Search Results 
        and click on the Create New button to proceed to the Enter Property Information form. 
        - Fill in all required fields and click on the Continue button 
        to proceed to the Enter Sale Information form.
        - Fill in all required fields and click on the Continue button 
        to proceed to the Enter Property Description form`, () => {
        
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToFindComps();

            Sales._FindComps
                .Actions.openAddNewComparableFormSearchResult(testData.compAddress, 1)
                .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
                .Page.newCompContinueButton.click();
            Sales._FindComps
                .Actions.selectDropdownOptionNewComp(
                    Sales._FindComps.Page.LinkTypeInput, testData.source
                ).
                SaleInfo.selectSaleDate();
            Sales._FindComps
                .Page.newCompContinueButton.click();
        });

        it("Test body", () => {
            cy.stepInfo(`1. Verify New Comp is created after clicking on the "Save&Close" button 
            on the Property description modal during creating a new comp > The "Creating a new comp" 
            modal is closed after the user clicks on the "Save&Close" button;`);
            // code

            cy.stepInfo(`2. Verify New Comp is added to Selected Comparables Table;`);
            // code

            cy.stepInfo(`3. Verify New Comp is added to Search Results list on the left side from Map;`);
            // code

            cy.stepInfo(`4. Verify New Comp is displayed in Search Results modal during the searching address`);
            // code

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });