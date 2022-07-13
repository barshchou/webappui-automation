import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_reconciliation/QA-4189.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, Property } from "../../../../../actions";
import { _map } from "../../../../../support/commands";
import mapKeysUtils from "../../../../../utils/mapKeys.utils";

describe("Rent is displayed on the same basis that is selected on In-Place rent roll", 
    { tags: [ "@income", "@commercial", "@rent_reconciliation" ] }, () => {

    before("Create report", () => {
       createReport(testData.reportCreationData);
       cy.stepInfo("Preconditions: Navigate to property summary, enter number of commercial units");
       _NavigationSection.navigateToPropertySummary();
       Property._Summary.enterNumberOfCommercialUnits(testData.unitsNumber);
    });

    it("[QA-4189] Rent is displayed on the same basis that is selected on In-Place rent roll", () => {
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
            .dragAllCommercialUnitsIntoGroup(testData.compGroupName, testData.unitsNumber)
            .saveCompPricesPerSFPerYearToAliasNumberFirstComps(testData.numberOfComparables, testData.compGroupName);

        cy.stepInfo(`5. Navigate to Rent Reconciliation and verify:
                    - Verify if Per Square Foot Per Month option is selected on In-Place RR page -> 
                        Rent label is "Rent/SF/Month" 
                    - Verify Rent/SF/Month for Base Unit
                    - Verify Rent/SF/Month for Subject Units
                    - Verify Rent/SF/Month for Rent Comps pulls`);
        _NavigationSection.navigateToRentReconciliation();
        Income._CommercialManager.RentReconciliation.verifyRentLabel(testData.rentPSFLabelName)
            .verifyBaseUnitRent(testData.rentPSFs.at(-1))
            .verifySubjectUnitRent(testData.rentPSFs[0]);
        for (let index = 0; index < testData.numberOfComparables; index++){
            Income._CommercialManager.RentReconciliation.Page.getCompRent(index).then(() => {
                let value = _map.get(`${index + 1}${mapKeysUtils.rent_per_sf}`);
                Income._CommercialManager.RentReconciliation.verifyCompsRent(value, index);
            });
        }
    });

    after(() => {
       deleteReport(testData.reportCreationData.reportNumber);
    });
});