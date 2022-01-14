import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4050.fixture";
import Homepage from "../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";

describe("Verify that Generated Commentary for Total Operating Expenses " +
    "is updated on the Expense Forecast page", () => {

    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToComparableExpenses();
        Income.ComparableExpenses.clickAddBlankColumnButton()
            .enterAddressByColumnIndex(testData.comparable.address)
            .enterLocationByColumnIndex(testData.comparable.location)
            .chooseExpensePeriodByColumnIndex(testData.comparable.period)
            .enterSquareFeetByColumnIndex(testData.comparable.squareFeet)
            .enterResidentialUnitsByColumnIndex(testData.comparable.resUnits)
            .enterInsuranceByColumnIndex(testData.comparable.insurance)
            .enterElectricityByColumnIndex(testData.comparable.electricity)
            .enterRepairsMaintenanceByColumnIndex(testData.comparable.repairsAndMaintenance)
            .enterPayrollBenefitsByColumnIndex(testData.comparable.payrollAndBenefits)
            .enterGeneralAdministrativeByColumnIndex(testData.comparable.generalAndAdministrative)
            .enterManagementFeesByColumnIndex(testData.comparable.management)
            .verifyTOEByColumnIndex(testData.comparable.toe)
            .verifyTOEPerSFByColumnIndex()
            .verifyToePerUnitByColumnIndex()
            .clickSaveContinueButton();
        Income.ExpenseForecast.enterForecastItemForecast(testData.expenseForecastInsurance)
            .verifyTOECommentary(testData.commentaries.generated)
            .editTOECommentary(testData.commentaries.edited)
            .verifyTOECommentary(testData.commentaries.edited)
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});