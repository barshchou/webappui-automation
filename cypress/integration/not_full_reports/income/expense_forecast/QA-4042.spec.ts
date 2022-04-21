import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4042.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";

describe(`Verify that Generated Commentary for Water & Sewer  
                is updated on the Expense Forecast page`, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToExpenseForecast();
        Income.ExpenseForecast.enterForecastItemForecast(testData.expenseForecastWaterAndSewer)
            .verifyWaterAndSewerCommentary(testData.commentaries.generatedPerSF)
            .editWaterAndSewerCommentary(testData.commentaries.edited)
            .verifyWaterAndSewerCommentary(testData.commentaries.edited);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});