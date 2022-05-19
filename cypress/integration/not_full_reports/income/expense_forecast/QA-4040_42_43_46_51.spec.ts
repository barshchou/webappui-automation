import { Property } from '../../../../actions/index';
import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4040_42_43_46_51.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../utils/tags.utils";

describe(`Verify that Generated Commentary are updated on the Expense Forecast page`,
    { tags: [ Tag.income, Tag.expense_forecast ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.residentialUnits)
                .clickSaveButton();
        cy.saveLocalStorage();
    });
    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("[QA-4042] Verify the generated commentary and inputs for Water And Sewer", () => {
        cy.stepInfo(`[QA-4042] => 1. Go to Expense Forecast`);
        _NavigationSection.navigateToExpenseForecast();
        cy.stepInfo(`[QA-4042] => 2. Fill Forecast value for SF basis and verify commentary`);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastWaterAndSewer)
            .verifyForecastCommentary(testData.commentariesWaterAndSewer.generatedPerSF, testData.expenseForecastWaterAndSewer)
            .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastWaterAndSewer)
            .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastWaterAndSewer);
        cy.stepInfo(`[QA-4042] => 3. Revert commentary value, switch to unit basis and fill Forecast value and verify commentary`);
        Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(testData.expenseForecastWaterAndSewer);
        testData.expenseForecastWaterAndSewer.basis = "unit";
        Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastWaterAndSewer);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastWaterAndSewer)
            .verifyForecastCommentary(testData.commentariesWaterAndSewer.generatedPerUnit, testData.expenseForecastWaterAndSewer)
            .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastWaterAndSewer)
            .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastWaterAndSewer);
        Income._ExpenseForecastActions.clickSaveButton();
    });

    it("[QA-4040] Verify the generated commentary and inputs for Insurance", () => {
        cy.stepInfo(`[QA-4040] => 1. Go to Expense Forecast`);
        _NavigationSection.navigateToExpenseForecast();
        cy.stepInfo(`[QA-4040] => 2. Fill Forecast value for SF basis and verify commentary`);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastInsurance)
            .verifyForecastCommentary(testData.commentariesInsurance.generatedPerSF, testData.expenseForecastInsurance)
            .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastInsurance)
            .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastInsurance);
        cy.stepInfo(`[QA-4040] => 3. Revert commentary value, switch to unit basis and fill Forecast value and verify commentary`);
        Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(testData.expenseForecastInsurance);
        testData.expenseForecastInsurance.basis = "unit";
        Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastInsurance);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastInsurance)
            .verifyForecastCommentary(testData.commentariesInsurance.generatedPerUnit, testData.expenseForecastInsurance)
            .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastInsurance)
            .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastInsurance);
        Income._ExpenseForecastActions.clickSaveButton();
    });

    it("[QA-4043] Verify the generated commentary and inputs for PayRoll & Benefits", () => {
        cy.stepInfo(`[QA-4043] => 1. Go to Expense Forecast`);
        _NavigationSection.navigateToExpenseForecast();
        cy.stepInfo(`[QA-4043] => 2. Fill Forecast value for SF basis and verify commentary`);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastPayrollAndBenefits)
            .verifyForecastCommentary(testData.commentariesPayrollAndBenefits.generatedPerSF, testData.expenseForecastPayrollAndBenefits)
            .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastPayrollAndBenefits)
            .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastPayrollAndBenefits);
        cy.stepInfo(`[QA-4043] => 3. Revert commentary value, switch to unit basis and fill Forecast value and verify commentary`);
        Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(testData.expenseForecastInsurance);
        testData.expenseForecastPayrollAndBenefits.basis = "unit";
        Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastPayrollAndBenefits);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastPayrollAndBenefits)
            .verifyForecastCommentary(testData.commentariesPayrollAndBenefits.generatedPerUnit, testData.expenseForecastPayrollAndBenefits)
            .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastPayrollAndBenefits)
            .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastPayrollAndBenefits);
        Income._ExpenseForecastActions.clickSaveButton();
    });

    it("[QA-4051] Verify the generated commentary and inputs for Repairs & Maintenance", () => {
        cy.stepInfo(`[QA-4051] => 1. Go to Expense Forecast`);
        _NavigationSection.navigateToExpenseForecast();
        cy.stepInfo(`[QA-4051] => 2. Fill Forecast value for SF basis and verify commentary`);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastRepairAndMaintenance)
            .verifyForecastCommentary(testData.commentariesRepairAndMaintenance.generatedPerSF, testData.expenseForecastRepairAndMaintenance)
            .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastRepairAndMaintenance)
            .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastRepairAndMaintenance);
        cy.stepInfo(`[QA-4051] => 3. Revert commentary value, switch to unit basis and fill Forecast value and verify commentary`);
        Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(testData.expenseForecastRepairAndMaintenance);
        testData.expenseForecastRepairAndMaintenance.basis = "unit";
        Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastRepairAndMaintenance);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastRepairAndMaintenance)
            .verifyForecastCommentary(testData.commentariesRepairAndMaintenance.generatedPerUnit, testData.expenseForecastRepairAndMaintenance)
            .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastRepairAndMaintenance)
            .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastRepairAndMaintenance);
        Income._ExpenseForecastActions.clickSaveButton();
    });

    it("[QA-4046] Verify the generated commentary and inputs for Replacement & Reserve", () => {
        cy.stepInfo(`[QA-4046] => 1. Go to Expense Forecast`);
        _NavigationSection.navigateToExpenseForecast();
        cy.stepInfo(`[QA-4046] => 2. Fill Forecast value for SF basis and verify commentary`);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastReplacementReserve)
            .verifyForecastCommentary(testData.commentariesReplacementReserve.generatedPerSF, testData.expenseForecastReplacementReserve)
            .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastReplacementReserve)
            .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastReplacementReserve);
        cy.stepInfo(`[QA-4046] => 3. Revert commentary value, switch to unit basis and fill Forecast value and verify commentary`);
        Income._ExpenseForecastActions.revertToOriginalExpenseForecastCommentary(testData.expenseForecastReplacementReserve);
        testData.expenseForecastReplacementReserve.basis = "unit";
        Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.expenseForecastReplacementReserve);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastReplacementReserve)
            .verifyForecastCommentary(testData.commentariesReplacementReserve.generatedPerUnit, testData.expenseForecastReplacementReserve)
            .editExpenseForecastCommentary(testData.editedCommentary, testData.expenseForecastReplacementReserve)
            .verifyForecastCommentary(testData.editedCommentary, testData.expenseForecastReplacementReserve);
            
        deleteReport(testData.reportCreationData.reportNumber);
    });
});