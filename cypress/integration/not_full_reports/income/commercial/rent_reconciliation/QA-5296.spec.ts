import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_reconciliation/QA-5296.fixture";
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
    });

    it(`[QA-5296] Verify the calculation of the "Trended Rent/SF" when "%" value is selected in 
        the "Calculations" drop-down of the "Rent Reconciliation" grid`, () => {
        cy.stepInfo('Steps: 1. Navigate to Income → Commercial → Rent Reconciliation');
        _NavigationSection.navigateToRentReconciliation();
        
        cy.stepInfo('2. Check that “%” is displayed in the “Calculations” dro-down field');
        Income._CommercialManager.RentReconciliation.verifyCalculationInputValue(testData.calculationTypePercent);

        cy.stepInfo('3. Enter any value into the input field of the “Market Conditions Adjustment” row for any added comparable (e.g. 5%)');
        for (let index = 0; index < testData.numberOfComparables; index++) {
            Income._CommercialManager.RentReconciliation
                .setLeaseTermsAdjustment(testData.leaseTermsAdjustments[index], testData.calculationTypePercent, index);
        }

        cy.stepInfo('4. Enter any value into the input field of the “Lease Terms Adjustment” row for the same comparable (e.g. 2%)');
        for (let index = 0; index < testData.numberOfComparables; index++) {
            Income._CommercialManager.RentReconciliation
                .setMarketConditionAdjustment(testData.marketConditionAdjustments[index], index);
        }

        cy.stepInfo(`5. Verify that the “Trended Rent/SF” for the comparable from steps 3 and 5 is calculated by the following formula:
            Rent/SF (the value is taken to the grid from the info of the added comparable)
            Formula: ((RentSF + ((RentSF * Lease Term Adjustment) / 100)) * Market Condition Adjustment ) / 100`);
        for (let index = 0; index < testData.numberOfComparables; index++) {
            Income._CommercialManager.RentReconciliation.Page.getCompRent(index).invoke('text').then(rentSf => {
                let rent = Number(rentSf.replace('$', ''));
                Income._CommercialManager.RentReconciliation
                    .verifyTrendedRentSF(rent, testData.leaseTermsAdjustments[index], testData.marketConditionAdjustments[index], index);
            });
            
        }

        deleteReport(testData.reportCreationData.reportNumber);
    });
});