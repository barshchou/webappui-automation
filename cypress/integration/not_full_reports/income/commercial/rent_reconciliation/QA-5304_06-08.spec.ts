import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_reconciliation/QA-5295-97_99.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, Property } from "../../../../../actions";

describe("Verify the calculation field values", 
    { tags: [ "@income", "@commercial", "@rent_reconciliation" ] }, () => {

    before("Create report", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo("Preconditions: Navigate to property summary, enter number of commercial units");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.unitsNumber);

        cy.stepInfo('1. Fill in Commercial In-Place RR table');
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootPerMonthButton();
        testData.leaseStatuses.forEach((status, index) => {
            Income._CommercialManager.InPlaceRentRoll
                .chooseLeaseStatusByRowNumber(status, index)
                .enterRentPerSFMonthlyByRowNumber(testData.rentPSFs[index], index);
         });
 
        cy.stepInfo('2. Add any Comp Group (Income > Commercial > Comp Groups)');
        cy.stepInfo('3. Move tenants to created Comp Group (Income > Commercial > Comp Groups)');
        _NavigationSection.openCompGroupsInCommercial();
        Income._CommercialManager.CompGroups
            .addCompGroup(testData.compGroupName)
            .dragAllCommercialUnitsIntoGroup(testData.compGroupName, testData.unitsNumber);
 
        cy.stepInfo('4. Select any rent comp (Income>Commercial>Rent Comps)');
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps.addNumberFirstComparables(testData.numberOfComparables)
            .dragAllCommercialUnitsIntoGroup(testData.compGroupName, testData.numberOfComparables);

        cy.stepInfo('Steps: 1. Navigate to Income → Commercial → Rent Reconciliation');
        _NavigationSection.navigateToRentReconciliation();

        cy.saveLocalStorage();
    });

    beforeEach('Restore Local Storage', () => {
        cy.restoreLocalStorage();
    });

    it(`[QA-5304] Verify the "Lease Terms Adjustment Sub-Total" row is displayed in the "Rent Reconciliation" grid
        [QA-5306] Verify the calculations for the "Lease Terms Adjustment Sub-Total" for Calculation = %
        [QA-5307] Verify the calculations for the "Lease Terms Adjustment Sub-Total" for Calculation = $/UnitSF`, () => {
        cy.stepInfo(`[QA-5304] 2. Verify that the “Lease Terms Adjustment Sub-Total” row is displayed right under 
                    the “Lease Terms Adjustment” row in the “Rent Reconciliation” grid.`);
        Income._CommercialManager.RentReconciliation.Page.leaseTermsAdjustmentRow
            .next()
            .children()
            .eq(0)
            .should('have.text', 'Lease Terms Adjustment Sub-Total');

        cy.stepInfo(`3. Set Calculation type -> "$/SF". 
                    Enter any value into the input field of the “Market Conditions Adjustment” row for any added comparable (e.g. 5%)`);
        Income._CommercialManager.RentReconciliation.setLeaseTermsCalculationType(testData.calculationTypeSF);
        for (let index = 0; index < testData.numberOfComparables; index++) {
            Income._CommercialManager.RentReconciliation
                .setLeaseTermsAdjustment(testData.leaseTermsAdjustments[index], testData.calculationTypeSF, index);
        }

        cy.stepInfo(`[QA-5306] 4. Verify that the “Lease Terms Adjustment Sub-Total” is calculated as Rent/SF + Lease Terms Adjustment`);
        for (let index = 0; index < testData.numberOfComparables; index++) {
            Income._CommercialManager.RentReconciliation.verifyLeaseTermsAdjustment(testData.calculationTypeSF, index);
        }

        cy.stepInfo(`3. Set Calculation type -> "%".
                    [QA-5307] 5. Verify the calculations for the “Lease Terms Adjustment Sub-Total” row (Rent/SF + Lease Terms Adjustment)`);
        Income._CommercialManager.RentReconciliation.setLeaseTermsCalculationType(testData.calculationTypePercent);
        for (let index = 0; index < testData.numberOfComparables; index++) {
            Income._CommercialManager.RentReconciliation.verifyLeaseTermsAdjustment(testData.calculationTypePercent, index);
        }
        
    });

    after('Cleanup', () => {
        deleteReport(testData.reportCreationData.reportNumber);
    });
});