import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/adjust_comps/QA-4130.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Income, Sales, DataCollections } from "../../../../actions";

// ToDo: Test fails due to problem with rounding: https://bowery.atlassian.net/browse/QA-6954
describe("Adjusted Price per Residential Unit in Sales Adjustment Grid is calculated with correct formula", 
    { tags: [ "@adjust_comps", "@sales" ] }, () => {

        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationData);
        });

        it("[QA-4130]", () => {
            cy.stepInfo(`2. Navigate to Property > Summary page and fill Residential Units and Commercial Units`);
            _NavigationSection.navigateToSubjectPropertyData();

            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberUnits)
                .enterNumberOfResUnits(testData.numberUnits);

            cy.stepInfo(`3. Fill in Income > In-Place Rent Roll table for both Residential 
            and Commercial with valid values, save the page`);
            _NavigationSection.navigateToResInPlaceRentRoll();

            Income._Residential.InPlaceRentRoll.enterMonthlyRentByRowNumber(testData.residentialUnit.monthlyRent)
                .enterLeaseStatusByRowNumber(testData.residentialUnit.leaseStatus)
                .enterRentTypeCellByRowNumber(testData.residentialUnit.rentType);
        
            cy.stepInfo(`4. Fill in Concluded Cap Rate on Income > Cap Rate Conclusion page. 
            Make sure As Is Market Value is not negative value`);
            _NavigationSection.navigateToCapRateConclusion();

            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.concludedCapRate);

            cy.stepInfo(`5. Navigate to Sales>Find Comps page and add at least one Sale Comp with 
            filled Sale Price, GBA (or selected Basis of Comparison), Residential/Commercial units , save the page`);
            _NavigationSection.navigateToFindComps();
            Sales._FindComps.AddressSearch.openAddressSearchTab()
                .addCompByParameter(testData.filter, 1);
            _NavigationSection.navigateToAdjustComps();
            Sales._AdjustComps.expandAdjustmentDetails(testData.adjustmentName)
                .verifyExpandMarketAdjustmentPricePerUnit(testData.calculationUnits[0], testData.numberUnits)
                .verifyExpandMarketAdjustmentPricePerUnit(testData.calculationUnits[1], 
                    testData.numberUnits + testData.numberUnits);
        });
    });