import testData from "../../../../fixtures/not_full_reports/income/potential_gross_income/QA-4603.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income, Property } from "../../../../actions";

describe("Commercial V/C Loss Discussion Generated Commentary", 
    { tags:[ "@income", "@potential_gross_income" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses,
                testData.numberOfCommercialUnits)
                .enterListPerSF(testData.leaseStatuses, testData.rentsPsf);
            _NavigationSection.navigateToPotentialGrossIncome();
            Income._PotentialGrossIncome.enterCommercialVCLossPercentage(testData.vcLossPercentage, testData.useValue)
                .enterSubjectAreaCommercialVacancy(testData.vacancyRate, testData.useValue)
                .checkCommercialSubjectSuitabilityByValue(testData.useValue, testData.subjectSuitabilityValue)
                .verifyCommercialVCLossCommentaryContain(testData.vcLossPercentage.toFixed(2))
                .verifyCommercialVCLossCommentaryContain(testData.vacancyRate)
                .enterCommercialVCLossPercentage(testData.changedVCLossPercentage, testData.useValue)
                .enterSubjectAreaCommercialVacancy(testData.vacancyRate, testData.useValue)
                .verifyCommercialVCLossCommentaryContain(testData.changedVCLossPercentage.toFixed(2))
                .verifyCommercialVCLossCommentaryContain(testData.changedVacancyRate);
        });
    });