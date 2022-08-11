import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-5395.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";

describe("Verify entered Use is displayed in Selected Rent Comps table", 
    { tags: [ "@income", "@commercial", "@rent_comps" ] }, () => {
        
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. The mixed report is created and several commercial units are added`);
            createReport(testData.reportCreationData);
        });

        it("[QA-5395]", () => {
            cy.stepInfo(`2. On the Income > Commercial > Comp Groups, a new Comp Group 
                        has been created with added Comps`); 
            _NavigationSection.navigateToCompGroups();
            Income._CommercialManager.CompGroups.addCompGroup(testData.compGroup);

            cy.stepInfo(`3. On the Income > Commercial > Rent Comps, comp has been added with Other -> 
                        Use-Other added text field`);
            _NavigationSection.clickCommercialRentComps()
                .submitSaveChangesModal();
            Income._CommercialManager.RentComps.clickManuallyAddANewCompButton()
                .searchNewCompByAddress(testData.address);
            testData.rentCompFields.forEach(field => {
                if (field.type == "input") {
                    Income._CommercialManager.RentComps.fillInRentCompFieldInput(field.name, field.value, true);
                } else {
                    Income._CommercialManager.RentComps.chooseRentCompFieldDropdownOption(field.name, field.value);
                }
            });
            Income._CommercialManager.RentComps.enterLeaseDate(testData.leaseDate)
                .checkUnitOfMeasureRadioButton(testData.unitMeasureMonthly)
                .clickSubmitButton()
                .clickRemoveButtonByRowNumber();

            cy.stepInfo(`4. When user clicks to the '+' button - the Removed Comps return to the appropriate group. 
                        If the comp does not have a group saved it can return to Uncategorized.`);
            Income._CommercialManager.RentComps.clickAddRemovedCompByRowButton();    

            cy.stepInfo(`5. Click  to the '-' button - the Removed Comps table would 
                        delete the comp entirely from the report`);
            Income._CommercialManager.RentComps.clickRemoveButtonByRowNumber()
                .clickRemoveRemovedCompByRowButton();
        
            cy.stepInfo(`6 Add several comp and Click to the Clear ALL button and verify that this button 
                        deletes all comps in the 'Removed Comps' table entirely from the report`);
            Income._CommercialManager.RentComps.openMap()
                .verifyProgressBarNotExist()
                .verifyFiltersDropdownExist()
                .addCompFromMapByAddress(testData.compAddress)
                .clickRemoveButtonByRowNumber()
                .clickClearAllButton(testData.title);

            cy.stepInfo(`7. If user saves and navigate away from the page with removed comps - 
                        they save to the page and user can re-add them`);
            Income._CommercialManager.RentComps.openMap()
                .verifyProgressBarNotExist()
                .verifyFiltersDropdownExist()
                .addCompFromMapByAddress(testData.compAddress)
                .clickRemoveButtonByRowNumber()
                .clickSaveContinueButton();

            _NavigationSection.navigateToCommercialRentComps();
            Income._CommercialManager.RentComps.Page.getRemovedCompRows().should('exist');
        });
    });