import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-5053-54.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Income, DataCollections } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import Enums from "../../../../enums/enums";
import { numberWithCommas } from "../../../../../utils/numbers.utils";
import proFormaKeys from "../../../../utils/mapKeys/income/pro_forma/proFormaKeys";

describe("Pro Forma -> Expenses", 
    { tags:[ "@income", "@pro_forma" ] }, () => {

        before("Create report", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(`2. Prepare report data: Navigate to Expense Forecast and add custom 
            categories and expenses forecast to the report`);
            _NavigationSection.navigateToExpenseForecast();
            testData.customCategories.forEach(customCategory => {
                Income._ExpenseForecastActions.addCustomExpenseCategory(customCategory.name);
            });
            testData.expensesItems.forEach(foreCastItem => {
                Income._ExpenseForecastActions.enterForecastItemForecast(foreCastItem);
            });
            testData.customCategories.forEach((customForecast, index) => {
                Income._ExpenseForecastActions.enterForecastItemForecast(customForecast, true, index);
            });

            cy.stepInfo(`3. Go to the Income → Tax Info → Tax Information → Current page 
            and fill in all necessary values`); 
            _NavigationSection.navigateToTaxInfo();
            Income._TaxInfo.switchIncludeTransitionalCheckbox(false)
                .enterTaxableAssessedLandValue(testData.landTaxAssessedValue)
                .enterTaxableAssessedBuildingValue(testData.buildingTaxAssessedValue)
                .saveTaxRate()
                .clickSaveButton()
                .verifyProgressBarNotExist();

            cy.saveLocalStorage();
        });

        beforeEach("Save local storage", () => {
            cy.restoreLocalStorage();
            _NavigationSection.navigateToProForma();
        });

        it("[QA-5054] Appraiser's Forecast of Custom Expense Forecast is included in calculation", () => {
            cy.stepInfo("4. On Pro Forma page validate Custom Expense Forecast is included in calculation");
            Income._ProFormaActions.calculateAndSaveTotalRealEstateTax(
                testData.landTaxAssessedValue,
                testData.buildingTaxAssessedValue)
                .calculateAndSaveTotalOperatingExpenses(
                    testData.fuelTotal,
                    testData.reserversTotal,
                    testData.waterAndSewerTotal,
                    testData.customTotal)
                .calculateAndSaveTotalOperatingExpensesExTaxes();

            Income._ProFormaActions
                .verifyCategoryTotal(`$${numberWithCommas(Math.round(testData.totalCustomCategory))}`, 
                    testData.customCategoryFirstCapital.name)
                .verifyCategoryTotal(`$${numberWithCommas(Math.round(testData.totalCustomCategory))}`, 
                    testData.customCategoryAllCapitals.name)
                .verifyCategoryTotal(`$${numberWithCommas(Math.round(testData.totalCustomCategory))}`, 
                    testData.customCategoryMix.name)
                .verifyCategoryTotal(`$${numberWithCommas(Math.round(testData.reserversTotal))}`, 
                    Enums.PRO_FORMA_TYPES.replacementsAndReserves)
                .verifyCategoryTotal(`$${numberWithCommas(Math.round(testData.waterAndSewerTotal))}`, 
                    Enums.PRO_FORMA_TYPES.waterAndSewer)
                .verifyCategoryTotal(`$${numberWithCommas(Math.round(testData.fuelTotal))}`, 
                    Enums.PRO_FORMA_TYPES.fuel);

            cy._mapGet(proFormaKeys.totalOperatingExpenses).then((totalOperatingExpenses) => {
                // Total Operating Income = -Total Operating Expenses
                const netOperationIncome = totalOperatingExpenses;
                Income._ProFormaActions.verifyCategoryTotal(`$${numberWithCommas(Math.round(totalOperatingExpenses))}`, 
                    Enums.PRO_FORMA_TYPES.totalOperatingExpenses
                ).verifyCategoryTotal(`-$${numberWithCommas(Math.round(netOperationIncome))}`, 
                    Enums.PRO_FORMA_TYPES.netOperatingIncome);
            });

            cy._mapGet(proFormaKeys.totalOperatingExpensesExTaxes).then((totalOperatingExpensesExTaxes) => {
                Income._ProFormaActions.verifyCategoryTotal(
                    `$${numberWithCommas(Math.round(totalOperatingExpensesExTaxes))}`, 
                    Enums.PRO_FORMA_TYPES.totalOperatingExpensesExTaxes
                );
            });

        });

        it("[QA-5053] Custom Expense Forecast is displayed in Operating Expenses grid on Pro Forma", () => {
            cy.stepInfo(`4. On Pro Forma page verify  there is validation for each custom expense 
                    forecast to capitalize the first letter of each word`);
            Income._ProFormaActions.verifyCustomCategoryName(testData.customCategoryFirstCapital.name)
                .verifyCustomCategoryName(testData.customCategoryAllCapitals.name)
                .verifyCustomCategoryName(testData.customCategoryMix.name);
        });
    });