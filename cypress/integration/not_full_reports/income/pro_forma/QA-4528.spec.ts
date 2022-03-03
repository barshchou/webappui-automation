import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4528.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";

describe("Residential V/C Loss @ X%", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.fillAllRentTypeCellsWithEqualValue(testData.rentType)
            .enterAllEqualLeaseStatuses(testData.leaseStatus, testData.numberOfUnits)
            .enterAllEqualMonthlyRents(testData.monthlyRent, testData.numberOfUnits);
        NavigationSection.navigateToPotentialGrossIncome();
        Income.PotentialGrossIncome.enterResVacancyCollLoss(testData.resVacancyCollectionLoss);
        NavigationSection.navigateToProForma();
        Income.ProForma.verifyResidentialVCLossLabel(testData.resVacancyCollectionLoss);
        deleteReport(testData.reportCreationData.reportNumber);
    });
})