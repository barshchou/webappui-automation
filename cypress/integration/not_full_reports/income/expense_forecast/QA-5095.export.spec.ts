import testData, { reportCreationFixture } from 
    "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5095.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { ReviewExport, Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { numberWithCommas } from "../../../../../utils/numbers.utils";

describe(`[QA-5095] Selected expenses forecast is exported to Estimated Operating Expense section`,
    { tags:[ "@income", "@expense_forecast", "@check_export" ] }, () => {

        it("Verify for each existing expense forecast and for Per SF as unit of measure", () => {
            createReport(reportCreationFixture("Per SF"));

            cy.stepInfo("1. Go to Expense Forecast");
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo("2. Select Expense Forecast by checking 'Include Expense on Pro Forma' checkbox");
            testData.expenseForecasts.forEach((forecastItem, index) => {
                forecastItem.basis = testData.perSFBasis;
                Income._ExpenseForecastActions.verifyIncludeInProFormaCheckboxIsChecked(testData.checkboxNames[index])
                    .changeStateOfPercentOfEGICheckbox(false)
                    .chooseForecastItemBasis(forecastItem)
                    .enterForecastItemForecast(forecastItem);
            });

            cy.stepInfo("3. Save the page and generate a report");
            Income._ExpenseForecastActions.clickSaveButton();
            _NavigationSection.openReviewAndExport();
            ReviewExport
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(reportCreationFixture("Per SF").reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath", { _reportName: reportCreationFixture("Per SF").reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.stepInfo(`4. Verify if selected Expense Forecast is displayed in 
                                Estimated Operating Expense section`);
                    cy.visit(<string>file);
                    cy.contains(testData.exportSectionName).scrollIntoView();
                    testData.forecastNames.forEach((forecastName, index) => {
                        cy.xpath(`//h3[text()='Estimated Operating Expenses']` + 
                        `/following-sibling::*[text()='${forecastName}']`)
                            .should("have.text", forecastName)
                            .next().contains(testData.perSFTitle).should("have.text", testData.perSFTitle);
                        cy.xpath(`//h3[text()='Estimated Operating Expenses']/following-sibling::
                        *[text()='${forecastName}']/following-sibling::table//tr`)
                            .eq(2).find("td").eq(1)
                            .should("have.text", 
                                `$${numberWithCommas(testData.expenseForecasts[index].forecast.toFixed(2))}`);
                    });
                });
        });

        it("Verify for each existing expense forecast and for Per Unit as unit of measure", () => {
            createReport(reportCreationFixture("Per Unit"));

            cy.stepInfo("1. Go to Expense Forecast");
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo("2. Select Expense Forecast by checking 'Include Expense on Pro Forma' checkbox");
            testData.expenseForecasts.forEach((forecastItem, index) => {
                forecastItem.basis = testData.perUnitBasis;
                Income._ExpenseForecastActions.verifyIncludeInProFormaCheckboxIsChecked(testData.checkboxNames[index])
                    .changeStateOfPercentOfEGICheckbox(false)
                    .chooseForecastItemBasis(forecastItem)
                    .enterForecastItemForecast(forecastItem);
            });

            cy.stepInfo("3. Save the page and generate a report");
            Income._ExpenseForecastActions.clickSaveButton();
            _NavigationSection.openReviewAndExport();
            ReviewExport
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(reportCreationFixture("Per Unit").reportNumber);

        });

        it("Check export", () => {
            Cypress.config().baseUrl = null;
            cy.task("getFilePath", { _reportName: reportCreationFixture("Per Unit").reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.stepInfo(`4. Verify if selected Expense Forecast is displayed 
                                in Estimated Operating Expense section`);
                    cy.visit(<string>file);
                    cy.contains(testData.exportSectionName).scrollIntoView();
                    testData.forecastNames.forEach((forecastName, index) => {
                        cy.xpath(`//h3[text()='Estimated Operating Expenses']` + 
                        `/following-sibling::*[text()='${forecastName}']`)
                            .should("have.text", forecastName)
                            .next().contains(testData.perUnitTitle).should("have.text", testData.perUnitTitle);
                        cy.xpath(`//h3[text()='Estimated Operating Expenses']/following-sibling::
                        *[text()='${forecastName}']/following-sibling::table//tr`)
                            .eq(2).find("td").eq(1)
                            .should("have.text", `$${numberWithCommas(testData.expenseForecasts[index].forecast)}`);
                    });
                });
        });

        it("Verify for each existing expense forecast and for Per Room as unit of measure", () => {
            createReport(reportCreationFixture("Per Room"));

            cy.stepInfo("1. Go to Expense Forecast");
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo("2. Select Expense Forecast by checking 'Include Expense on Pro Forma' checkbox");
        
            Income._ExpenseForecastActions.verifyIncludeInProFormaCheckboxIsChecked(testData.fuelForecastPerRoom.name)
                .chooseForecastItemBasis(testData.fuelForecastPerRoom)
                .enterForecastItemForecast(testData.fuelForecastPerRoom);

            cy.stepInfo("3. Save the page and generate a report");
            Income._ExpenseForecastActions.clickSaveButton();
            _NavigationSection.openReviewAndExport();
            ReviewExport
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(reportCreationFixture("Per Room").reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath", { _reportName: reportCreationFixture("Per Room").reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.stepInfo(`4. Verify if selected Expense Forecast is displayed 
                                in Estimated Operating Expense section`);
                    cy.visit(<string>file);
                    cy.contains(testData.exportSectionName).scrollIntoView();
                    cy.xpath(`//h4[text()='${testData.fuelForecastName}']/following-sibling::p`).eq(0)
                        .should("include.text", 
                            `$${numberWithCommas(testData.fuelForecastPerRoom.forecast.toFixed(2))}`)
                        .should("include.text", testData.perRoomTitle);
                });
        });
    });