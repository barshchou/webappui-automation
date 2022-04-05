import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4532.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";

describe("Residential V/C Loss @ X% -> Per Unit", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.enterAllEqualRentTypeCells(testData.rentType)
            .enterAllEqualLeaseStatuses(testData.leaseStatus)
            .enterAllEqualMonthlyRents(testData.monthlyRent);
        NavigationSection.navigateToPotentialGrossIncome();
        Income.PotentialGrossIncome.enterResVacancyCollLoss(testData.resVacancyCollectionLoss)
            .clickSaveButton()
            .verifyProgressBarNotExist();
        // TODO: Change to navigation with saving, after https://bowery.atlassian.net/browse/WEB-4956 bug fix
        NavigationSection.navigateToProForma(false);
        Income.ProForma.verifyResidentialVCLossPerUnit(testData.numberOfUnits);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});