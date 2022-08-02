import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4393.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Monthly Rent Total is calculated correctly in the grid.", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToPropertySummary();
            Property.Summary.enterNumberOfCommercialUnits(testData.general.numberOfUnits);
            NavigationSection.navigateToCommercialUnits();
            Property.CommercialUnits.enterListUnitSF(testData.general.squareFeetList, testData.general.numberOfUnits);
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusesList, 
                testData.general.numberOfUnits)
                .clickMonthlyBasisButton()
                .enterListMonthlyRent(testData.leaseStatusesList, testData.general.monthlyRents)
                .verifyMonthlyRentTotal(testData.leaseStatusesList, testData.general.monthlyRents);
        });
    });