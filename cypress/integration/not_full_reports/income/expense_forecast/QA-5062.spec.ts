import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5062.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income, ReviewExport } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`Changes is saved on clicking "Save" button on "Editing Expense Category" modal`,
    { tags:[ "@income", "@expense_forecast" ] }, () => {
        it("[QA-5062]", () => {
            cy.stepInfo(`Preconditions: Create a report and setup building.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits)
                .enterGrossBuildingArea(testData.grossBuildingArea);

            cy.stepInfo(`1. Go to Expense Forecast and add new Expense Forecast with valid name (ex. Heating)`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`2. Add new custom category`);
            Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name)
                .chooseForecastItemBasis(testData.customCategory, true);

            cy.stepInfo(`3. Edit custom category with the new name`);
            Income._ExpenseForecastActions.Page
                .editCustomExpenseCategoryButton(testData.customCategory.name, true).click();
            Income._ExpenseForecastActions.Page.newCategoryExpenseName.clear()
                .type(`${testData.newCategoryName}{downArrow}{enter}`);
            Income._ExpenseForecastActions.Page.formSaveBtn(1).click();

            cy.stepInfo(`4. Navigate to Pro Forma page and verify new category name exists`);
            _NavigationSection.navigateToProForma();
            Income._ProFormaActions.Page.getCategoryElementByType(testData.newCategoryName, "label")
                .should('exist');

            cy.stepInfo(`5. Generate and download report`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("[QA-5062] Check export", () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.stepInfo(`6. Verify custom category exist in Pro Forma`);
                    cy.visit(<string>file);
                    cy.xpath(`//p[.='Pro Forma']`).eq(0).next().within(() => {
                        cy.contains(testData.newCategoryName).should('exist');
                    });
                });
        });
    });