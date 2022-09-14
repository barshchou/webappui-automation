import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4392.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income, Property } from "../../../../../actions";

describe("Verify the Annual Rent Total is calculated correctly in the grid.", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.general.numberOfUnits);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.general.squareFeetList, testData.general.numberOfUnits);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusesList,
                testData.general.numberOfUnits)
                .clickAnnuallyBasisButton()
                .enterListAnnuallyRent(testData.leaseStatusesList, testData.general.annualRents)
                .verifyAnnuallyRentTotal(testData.leaseStatusesList, testData.general.annualRents);
        });
    });