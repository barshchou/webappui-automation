import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4050.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`Verify that Generated Commentary for Total Operating Expenses is updated on the Expense Forecast page`, 
    { tags: [ "@income", "@expense_forecast" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToComparableExpenses();
            Income.ComparableExpenses.clickAddBlankColumnButton()
                .enterAddressByColumnIndex(testData.comparable.address)
                .enterCityByColumnIndex(testData.comparable.city)
                .chooseExpensePeriodByColumnIndex(testData.comparable.period)
                .enterSquareFeetByColumnIndex(testData.comparable.squareFeet)
                .enterResidentialUnitsByColumnIndex(testData.comparable.resUnits)
                .enterCellDollarValueByColumnIndex(
                    Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("insurance"),
                    testData.comparable.insurance)
                .enterCellDollarValueByColumnIndex(
                    Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("electricity"),
                    testData.comparable.electricity)
                .enterCellDollarValueByColumnIndex(
                    Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("repairsAndMaintenance"),
                    testData.comparable.repairsAndMaintenance)
                .enterCellDollarValueByColumnIndex(
                    Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("payrollAndBenefits"),
                    testData.comparable.payrollAndBenefits)
                .enterCellDollarValueByColumnIndex(
                    Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("generalAndAdministrative"),
                    testData.comparable.generalAndAdministrative)
                .enterCellDollarValueByColumnIndex(
                    Income.ComparableExpenses.Page.getUnifiedEditableAndTotalCells("management"),
                    testData.comparable.management)
                .verifyTOEByColumnIndex(testData.comparable.toe)
                .verifyTOEPerSFByColumnIndex()
                .verifyToePerUnitByColumnIndex();
            NavigationSection.navigateToExpenseForecast();
            Income.ExpenseForecast.enterForecastItemForecast(testData.expenseForecastInsurance)
                .verifyTOECommentary(testData.commentaries.generated)
                .editTOECommentary(testData.commentaries.edited)
                .verifyTOECommentary(testData.commentaries.edited);
        });
    });
