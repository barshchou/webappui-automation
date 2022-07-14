import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4618.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import columns from "../../../../../enums/compGroupsColumns.enum";

describe("Verify entered Use is displayed in Selected Rent Comps table", 
    { tags: [ "@income", "@commercial", "@rent_comps" ] }, () => {
        
    before("Login, create report", () => {
        cy.stepInfo(`1. The mixed report is created and several commercial units are added`);
        createReport(testData.reportCreationData);
    });

    it("[QA-4618]", () => {
        cy.stepInfo(`2. On the Income > Commercial > Comp Groups, a new Comp Group has been created with added Comps`); 
        _NavigationSection.navigateToCompGroups();
        Income._CommercialManager.CompGroups.addCompGroup(testData.compGroup);

        cy.stepInfo(`3. On the Income > Commercial > Rent Comps, comp has been added with Other -> 
                    Use-Other added text field`);
        _NavigationSection.clickCommercialRentComps()
            .clickYesIfExist();
        Income._CommercialManager.RentComps.clickManuallyAddANewCompButton().
            searchNewCompByAddress(testData.address);
        testData.rentCompFields.forEach(field => {
            if(field.type == "input") {
                Income._CommercialManager.RentComps.fillInRentCompFieldInput(field.name, field.value);
            } else {
                Income._CommercialManager.RentComps.chooseRentCompFieldDropdownOption(field.name, field.value);
            }
        });
        Income._CommercialManager.RentComps.enterLeaseDate(testData.leaseDate)
            .checkUnitOfMeasureRadioButton(testData.unitMeasureMontly)
            .clickSubmitButton()
            .dragAllCommercialUnitsIntoGroup(testData.compGroup, testData.compsAmount);

        cy.stepInfo(`4. Navigate to Comp Group Discussion page and verify the entered use appears 
                    under use Commercial Comp Groups Discussion page`);
        _NavigationSection.clickCommercialCompGroupsDiscussion()
            .clickYesIfExist();
        Income._CommercialManager.CompGroupsDiscussion.verifyCompGroupUnitValue(testData.compGroup, columns.use, 
             testData.otherUse);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});