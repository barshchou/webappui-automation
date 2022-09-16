import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4306.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income, Sales } from "../../../../actions";

describe(`Prospective Market Value As Stabilized -> Less Entrepreneurial Profit 
                data is pulled from Cap Rate Conclusion`, 
{ tags:[ "@sales", "@value_conclusion" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.generalData.numberOfUnits);
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.enterBedroomsNumberByRowNumber(testData.rentRollData.bedrooms)
            .enterRentTypeCellByRowNumber(testData.rentRollData.rentType)
            .enterLeaseStatusByRowNumber(testData.rentRollData.leaseStatus)
            .enterMonthlyRentByRowNumber(testData.rentRollData.monthlyRent);
        _NavigationSection.navigateToCapRateConclusion();
        Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.generalData.appraiserConclusion)
            .enterLessEntrepreneurialProfit(testData.generalData.lessEntrepreneurialProfit, 
                testData.valueConclusionKeyAsComplete)
            .enterAsCompleteLessBuyoutCost(testData.generalData.lessBuyoutCost)
            .verifyPopUpWithTitleExists(testData.generalData.lessEntrepreneurialProfitPopUp);
        _NavigationSection.navigateToSalesValueConclusion()
            .verifyProgressBarNotExist();
        Sales._ValueConclusion.verifyAsCompleteLessEntrepreneurialProfit(testData.generalData.lessEntrepreneurialProfit)
            .verifyPopUpWithTitleExists(testData.generalData.lessEntrepreneurialProfitPopUp);
    });
});
