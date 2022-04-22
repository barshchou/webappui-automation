import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4042.fixture";
import { _NavigationSection} from "../../../../actions/base";
import Income from "../../../../actions/income/income.manager";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";

describe(`Verify that Generated Commentary are updated on the Expense Forecast page`, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4042]", () => {
        cy.stepInfo(`[QA-4042] => 1. Go to Expense Forecast`);
        _NavigationSection.navigateToExpenseForecast();
        cy.stepInfo(`[QA-4042] => 2. Fill Forecast value for SF basis and verify commentary`);
        Income.ExpenseForecast.enterForecastItemForecast(testData.expenseForecastWaterAndSewer)
            .verifyForecastCommentary(testData.commentariesWaterAndSewer.generatedPerSF, testData.expenseForecastWaterAndSewer)
            .editExpenseForecastCommentary(testData.commentariesWaterAndSewer.edited, testData.expenseForecastWaterAndSewer)
            .verifyForecastCommentary(testData.commentariesWaterAndSewer.edited, testData.expenseForecastWaterAndSewer);
        cy.stepInfo(`[QA-4042] => 3. Revert commentary value, switch to unit basis and fill Forecast value and verify commentary`);
        Income.ExpenseForecast.revertToOriginalExpenseForecastCommentary(testData.expenseForecastWaterAndSewer);
        testData.expenseForecastWaterAndSewer.basis = "unit";
        Income.ExpenseForecast.switchExpenseForecastBasis(testData.expenseForecastWaterAndSewer);
        Income.ExpenseForecast.enterForecastItemForecast(testData.expenseForecastWaterAndSewer)
            .verifyForecastCommentary(testData.commentariesWaterAndSewer.generatedPerUnit, testData.expenseForecastWaterAndSewer)
            .editExpenseForecastCommentary(testData.commentariesWaterAndSewer.edited, testData.expenseForecastWaterAndSewer)
            .verifyForecastCommentary(testData.commentariesWaterAndSewer.edited, testData.expenseForecastWaterAndSewer);
        Income.ExpenseForecast.clickSaveButton();
    });

    it("[QA-4046]", () => {
        cy.stepInfo(`[QA-4046] => 1. Go to Expense Forecast`);
        _NavigationSection.navigateToExpenseForecast();
        cy.stepInfo(`[QA-4046] => 2. Fill Forecast value for SF basis and verify commentary`);
        Income.ExpenseForecast.enterForecastItemForecast(testData.expenseForecastReplacementReserve)
            .verifyForecastCommentary(testData.commentariesReplacementReserve.generatedPerSF, testData.expenseForecastReplacementReserve)
            .editExpenseForecastCommentary(testData.commentariesReplacementReserve.edited, testData.expenseForecastReplacementReserve)
            .verifyForecastCommentary(testData.commentariesReplacementReserve.edited, testData.expenseForecastReplacementReserve);
        cy.stepInfo(`[QA-4046] => 3. Revert commentary value, switch to unit basis and fill Forecast value and verify commentary`);
        Income.ExpenseForecast.revertToOriginalExpenseForecastCommentary(testData.expenseForecastReplacementReserve);
        testData.expenseForecastReplacementReserve.basis = "unit";
        Income.ExpenseForecast.switchExpenseForecastBasis(testData.expenseForecastReplacementReserve);
        Income.ExpenseForecast.enterForecastItemForecast(testData.expenseForecastReplacementReserve)
            .verifyForecastCommentary(testData.commentariesReplacementReserve.generatedPerUnit, testData.expenseForecastReplacementReserve)
            .editExpenseForecastCommentary(testData.commentariesReplacementReserve.edited, testData.expenseForecastReplacementReserve)
            .verifyForecastCommentary(testData.commentariesReplacementReserve.edited, testData.expenseForecastReplacementReserve);
        cy.login();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});