import testData from "../../../../fixtures/not_full_reports/income/potential_gross_income/QA-4603.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";

describe("Commercial V/C Loss Discussion Generated Commentary", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits)
            .enterListPerSF(testData.leaseStatuses, testData.rentsPsf);
        NavigationSection.navigateToPotentialGrossIncome();
        Income.PotentialGrossIncome.enterCommercialVCLossPercentage(testData.vcLossPercentage, testData.useValue)
            .enterSubjectAreaCommercialVacancy(testData.vacancyRate, testData.useValue)
            .checkCommercialSubjectSuitabilityByValue(testData.useValue, testData.subjectSuitabilityValue)
            .verifyCommercialVCLossCommentaryContain(testData.vcLossPercentage.toFixed(2))
            .verifyCommercialVCLossCommentaryContain(testData.vacancyRate)
            .enterCommercialVCLossPercentage(testData.changedVCLossPercentage, testData.useValue)
            .enterSubjectAreaCommercialVacancy(testData.vacancyRate, testData.useValue)
            .verifyCommercialVCLossCommentaryContain(testData.changedVCLossPercentage.toFixed(2))
            .verifyCommercialVCLossCommentaryContain(testData.changedVacancyRate);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});