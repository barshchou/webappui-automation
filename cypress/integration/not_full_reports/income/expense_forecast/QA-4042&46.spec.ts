import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4042.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";

describe(`Verify that Generated Commentary are updated on the Expense Forecast page`, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4042]", () => {
        cy.stepInfo(`[QA-4042] => 1. Go to Expense Forecast`);
        NavigationSection.navigateToExpenseForecast();
        cy.stepInfo(`[QA-4042] => 2. Fill Forecast value for SF basis and verify commentary`);
        Income.ExpenseForecast.enterForecastItemForecast(testData.expenseForecastWaterAndSewer)
            .verifyForecastCommentary(testData.commentariesWaterAndSewer.generatedPerSF, testData.expenseForecastWaterAndSewer.name)
            .editWaterAndSewerCommentary(testData.commentariesWaterAndSewer.edited)
            .verifyForecastCommentary(testData.commentariesWaterAndSewer.edited, testData.expenseForecastWaterAndSewer.name);
        cy.stepInfo(`[QA-4042] => 3. Revert commentary value, switch to unit basis and fill Forecast value and verify commentary`);
        Income.ExpenseForecast.revertToOriginalWaterAndSewerCommentary();
        testData.expenseForecastWaterAndSewer.basis = "unit";
        Income.ExpenseForecast.switchExpenseForecastBasis(testData.expenseForecastWaterAndSewer);
        Income.ExpenseForecast.enterForecastItemForecast(testData.expenseForecastWaterAndSewer)
            .verifyForecastCommentary(testData.commentariesWaterAndSewer.generatedPerUnit, testData.expenseForecastWaterAndSewer.name)
            .editWaterAndSewerCommentary(testData.commentariesWaterAndSewer.edited)
            .verifyForecastCommentary(testData.commentariesWaterAndSewer.edited, testData.expenseForecastWaterAndSewer.name);
        Income.ExpenseForecast.clickSaveButton();
    });

    it("[QA-4046]", () => {
        cy.stepInfo(`[QA-4046] => 1. Go to Expense Forecast`);
        NavigationSection.navigateToExpenseForecast();
        cy.stepInfo(`[QA-4046] => 2. Fill Forecast value for SF basis and verify commentary`);
        Income.ExpenseForecast.enterForecastItemForecast(testData.expenseForecastReplacementReserve)
            .verifyForecastCommentary(testData.commentariesReplacementReserve.generatedPerSF, testData.expenseForecastReplacementReserve.name)
            .editReplacementReservesCommentary(testData.commentariesReplacementReserve.edited)
            .verifyForecastCommentary(testData.commentariesReplacementReserve.edited, testData.expenseForecastReplacementReserve.name);
        cy.stepInfo(`[QA-4046] => 3. Revert commentary value, switch to unit basis and fill Forecast value and verify commentary`);
        Income.ExpenseForecast.revertToOriginalReplacementReservesCommentary();
        testData.expenseForecastReplacementReserve.basis = "unit";
        Income.ExpenseForecast.switchExpenseForecastBasis(testData.expenseForecastReplacementReserve);
        Income.ExpenseForecast.enterForecastItemForecast(testData.expenseForecastReplacementReserve)
            .verifyForecastCommentary(testData.commentariesReplacementReserve.generatedPerUnit, testData.expenseForecastReplacementReserve.name)
            .editReplacementReservesCommentary(testData.commentariesReplacementReserve.edited)
            .verifyForecastCommentary(testData.commentariesReplacementReserve.edited, testData.expenseForecastReplacementReserve.name);
        cy.login();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});