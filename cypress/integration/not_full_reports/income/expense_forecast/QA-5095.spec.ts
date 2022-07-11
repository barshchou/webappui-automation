import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5095.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { ReviewExport, Income } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { numberWithCommas } from "../../../../../utils/numbers.utils";

describe(`[QA-5095] Selected expenses forecast is exported to Estimated Operating Expense section`,
    { tags:[ "@fix", "@income", "@expense_forecast", "@snapshot_tests" ] }, () => {

    const url = `${Cypress.config().baseUrl}`;

    it("Verify for each existing expense forecast and for Per SF as unit of measure", () => {
        createReport(testData.reportCreationDataPerSFBasis);

        cy.stepInfo("1. Go to Expense Forecast");
        _NavigationSection.navigateToExpenseForecast();

        cy.stepInfo("2. Select Expense Forecast by checking 'Include Expense on Pro Forma' checkbox");
        testData.expenseForecasts.forEach((forecastItem, index) => {
            forecastItem.basis = testData.perSFBasis;
            Income._ExpenseForecastActions
                .verifyIncludeInProFormaCheckboxIsChecked(testData.checkboxNames[index]);
            Income._ExpenseForecastActions.changeStateOfPercentOfEGICheckbox(false);
            Income._ExpenseForecastActions.chooseForecastItemBasis(forecastItem);
            Income._ExpenseForecastActions.enterForecastItemForecast(forecastItem);
        });

        cy.stepInfo("3. Save the page and generate a report");
        Income._ExpenseForecastActions.clickSaveButton();
        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataPerSFBasis.reportNumber);

        deleteReport(testData.reportCreationDataPerSFBasis.reportNumber);
    });

    it("Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationDataPerSFBasis.reportNumber, _docx_html: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo("4. Verify if selected Expense Forecast is displayed in Estimated Operating Expense section");
                cy.visit(<string>file);
                cy.contains("Estimated Operating Expenses").scrollIntoView();
                testData.forecastNames.forEach((forecastName, index) => {
                    cy.xpath(`//h3[text()='Estimated Operating Expenses']/following-sibling::*[text()='${forecastName}']`)
                        .should("have.text", forecastName)
                        .next().contains("PSF Summary").should("have.text", "PSF Summary");
                    cy.xpath(`//h3[text()='Estimated Operating Expenses']/following-sibling::
                        *[text()='${forecastName}']/following-sibling::table//tr`)
                        .eq(2).find("td").eq(1)
                        .should("have.text", `$${numberWithCommas(testData.expenseForecasts[index].forecast.toFixed(2))}`);
                });
            });
    });

    it("Verify for each existing expense forecast and for Per Unit as unit of measure", () => {
        Cypress.config().baseUrl = url;
        createReport(testData.reportCreationDataPerUnitBasis);

        cy.stepInfo("1. Go to Expense Forecast");
        _NavigationSection.navigateToExpenseForecast();

        cy.stepInfo("2. Select Expense Forecast by checking 'Include Expense on Pro Forma' checkbox");
        testData.expenseForecasts.forEach((forecastItem, index) => {
            forecastItem.basis = testData.perUnitBasis;
            Income._ExpenseForecastActions
                .verifyIncludeInProFormaCheckboxIsChecked(testData.checkboxNames[index]);
            Income._ExpenseForecastActions.changeStateOfPercentOfEGICheckbox(false);
            Income._ExpenseForecastActions.chooseForecastItemBasis(forecastItem);
            Income._ExpenseForecastActions.enterForecastItemForecast(forecastItem);
        });

        cy.stepInfo("3. Save the page and generate a report");
        Income._ExpenseForecastActions.clickSaveButton();
        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataPerUnitBasis.reportNumber);

        deleteReport(testData.reportCreationDataPerUnitBasis.reportNumber);
    });

    it("Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationDataPerUnitBasis.reportNumber, _docx_html: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo("4. Verify if selected Expense Forecast is displayed in Estimated Operating Expense section");
                cy.visit(<string>file);
                cy.contains("Estimated Operating Expenses").scrollIntoView();
                testData.forecastNames.forEach((forecastName, index) => {
                    cy.xpath(`//h3[text()='Estimated Operating Expenses']/following-sibling::*[text()='${forecastName}']`)
                        .should("have.text", forecastName)
                        .next().contains("Per Unit Summary").should("have.text", "Per Unit Summary");
                    cy.xpath(`//h3[text()='Estimated Operating Expenses']/following-sibling::
                        *[text()='${forecastName}']/following-sibling::table//tr`)
                        .eq(2).find("td").eq(1)
                        .should("have.text", `$${numberWithCommas(testData.expenseForecasts[index].forecast)}`);
                });
            });
    });

    it("Verify for each existing expense forecast and for Per Room as unit of measure", () => {
        Cypress.config().baseUrl = url;
        createReport(testData.reportCreationDataPerRoomBasis);

        cy.stepInfo("1. Go to Expense Forecast");
        _NavigationSection.navigateToExpenseForecast();

        cy.stepInfo("2. Select Expense Forecast by checking 'Include Expense on Pro Forma' checkbox");
        
        Income._ExpenseForecastActions
            .verifyIncludeInProFormaCheckboxIsChecked(testData.fuelForecastPerRoom.name);
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.fuelForecastPerRoom);
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.fuelForecastPerRoom);

        cy.stepInfo("3. Save the page and generate a report");
        Income._ExpenseForecastActions.clickSaveButton();
        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationDataPerRoomBasis.reportNumber);

        deleteReport(testData.reportCreationDataPerRoomBasis.reportNumber);
    });

    it("Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationDataPerRoomBasis.reportNumber, _docx_html: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.stepInfo("4. Verify if selected Expense Forecast is displayed in Estimated Operating Expense section");
                cy.visit(<string>file);
                cy.contains("Estimated Operating Expenses").scrollIntoView();
                cy.xpath(`//h4[text()='${testData.fuelForecastName}']/following-sibling::p`)
                    .should("include.text", `$${numberWithCommas(testData.fuelForecastPerRoom.forecast.toFixed(2))}`)
                    .should("include.text", "per room");
            });
    });
});