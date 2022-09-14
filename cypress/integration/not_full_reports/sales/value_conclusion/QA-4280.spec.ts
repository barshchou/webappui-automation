import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4280.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import Enums from "../../../../enums/enums";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income, Sales } from "../../../../actions";

describe(`Prospective Market Value As Stabilized -> Less Residential Rent Loss 
                data is pulled from Cap Rate Conclusion`, 
{ tags:[ "@sales", "@value_conclusion" ] }, () => {
    beforeEach("Login action", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.data.numberOfUnits);
        if (testData.reportCreationData.conclusionValue === "AS_COMPLETE") {
            DataCollections._SubjectPropertyData.enterCurrentNumberOfResUnits(testData.data.numberOfUnits);
        }
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.enterBedroomsNumberByRowNumber(testData.data.bedroomsNumber)
            .enterRentTypeCellByRowNumber(testData.data.rentType)
            .enterLeaseStatusByRowNumber(testData.data.leaseStatus)
            .enterMonthlyRentByRowNumber(testData.data.monthlyRent);
        _NavigationSection.navigateToCapRateConclusion();
        Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.data.appraisersConclusion)
            .clickAddRentLoss(Enums.UNIT_INCOME_TYPE.residential);
        if (testData.reportCreationData.conclusionValue === "AS_COMPLETE") {
            Income._CapRateConclusion.clickAsStabilizedRentLossSwitch(Enums.VALUE_CONCLUSION_NAME.asStabilized);
        }
        Income._CapRateConclusion.checkRentLossCheckboxByRow()
            .clickAddButton()
            .enterLossTimePeriodByRow(testData.data.rentLossTimePeriod,
                testData.valueConclusionKeyAsStabilized, testData.rentLossTypeResidential);
        _NavigationSection.navigateToSalesValueConclusion()
            .verifyProgressBarNotExist();
        Sales._ValueConclusion.verifyAsStabResRentLossTimePeriodByRow(testData.data.rentLossTimePeriod);
    });
});
