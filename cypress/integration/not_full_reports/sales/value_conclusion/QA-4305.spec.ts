import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4305.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income, Sales } from "../../../../actions";

describe("Prospective Market Value As Stabilized -> Less Commission Fee data is pulled from Cap Rate Conclusion",
    { tags:[ "@sales", "@value_conclusion" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.enterRentTypeCellByRowNumber(testData.rentType);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterAsStabilizedCommissionFeeAmount(testData.commissionFee);
            _NavigationSection.navigateToSalesValueConclusion()
                .verifyProgressBarNotExist();
            Sales._ValueConclusion.verifyAsStabilizedCommissionFeeAmount(testData.commissionFee);
        });
    });