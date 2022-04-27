import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4050.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";

describe(`Verify that Generated Commentary for Total Operating Expenses 
                is updated on the Expense Forecast page`, {tags: "@fix"} ,() => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToComparableExpenses();
        Income.ComparableExpenses.clickAddBlankColumnButton()
            .enterAddressByColumnIndex(testData.comparable.address)
            .enterLocationByColumnIndex(testData.comparable.location)
            .chooseExpensePeriodByColumnIndex(testData.comparable.period)
            .enterSquareFeetByColumnIndex(testData.comparable.squareFeet)
            .enterResidentialUnitsByColumnIndex(testData.comparable.resUnits)
            .enterCellDollarValueByColumnIndex(Income.ComparableExpenses.Page.insuranceCells, testData.comparable.insurance)
            .enterCellDollarValueByColumnIndex(Income.ComparableExpenses.Page.electricityCells, testData.comparable.electricity)
            .enterCellDollarValueByColumnIndex(Income.ComparableExpenses.Page.repairsCells, testData.comparable.repairsAndMaintenance)
            .enterCellDollarValueByColumnIndex(Income.ComparableExpenses.Page.payrollCells, testData.comparable.payrollAndBenefits)
            .enterCellDollarValueByColumnIndex(Income.ComparableExpenses.Page.generalCells, testData.comparable.generalAndAdministrative)
            .enterCellDollarValueByColumnIndex(Income.ComparableExpenses.Page.managementFeesCells, testData.comparable.management)
            .verifyTOEByColumnIndex(testData.comparable.toe)
            .verifyTOEPerSFByColumnIndex()
            .verifyToePerUnitByColumnIndex();
        NavigationSection.navigateToExpenseForecast();
        Income.ExpenseForecast.enterForecastItemForecast(testData.expenseForecastInsurance)
            .verifyTOECommentary(testData.commentaries.generated)
            .editTOECommentary(testData.commentaries.edited)
            .verifyTOECommentary(testData.commentaries.edited);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});