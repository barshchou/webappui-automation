import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5095.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { ReviewExport, Income } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5095] Selected expenses forecast is exported to Estimated Operating Expense section`,
    { tags:[ "@fix", "@income", "@expense_forecast", "@snapshot_tests" ] }, () => {

    const url = `${Cypress.config().baseUrl}`;

    it("Verify for each existing expense forecast and for Per SF as unit of measure", () => {
        createReport(testData.reportCreationData);

        cy.stepInfo("1. Go to Expense Forecast");
        _NavigationSection.navigateToExpenseForecast();

        cy.stepInfo("2. Select Expense Forecast by checking 'Include Expense on Pro Forma' checkbox");
        testData.expenseForecasts.forEach((forecastItem, index) => {
            forecastItem.basis = testData.perSFBasis;
            Income._ExpenseForecastActions
                .changeStateOfIncludeInProFormaCheckbox(testData.checkboxNames[index]);
            Income._ExpenseForecastActions.changeStateOfPercentOfEGICheckbox(false);
            Income._ExpenseForecastActions.chooseForecastItemBasis(forecastItem);
            Income._ExpenseForecastActions.enterForecastItemForecast(forecastItem);
        });

        cy.stepInfo("3. Save the page and generate a report");
        Income._ExpenseForecastActions.clickSaveButton();
        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.stepInfo("4. Verify if selected Expense Forecast is displayed in Estimated Operating Expense section");
            cy.visit(<string>file);
            
        }); 
    });
});