import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4995.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { DataCollections, Income } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import proFormaTypesEnum from "../../../../enums/proFormaTypes.enum";
import { numberWithCommas } from "../../../../../utils/numbers.utils";

describe("[QA-4995] Verify that combined utilities expenses is enabled on the Pro Forma page",
    { tags:[ "@income", "@pro_forma" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);

            cy.stepInfo(`1. Pre-condition: Residential Units should be filled in on Property > Summary form`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo(`2. Navigate to Expense Forecast page and set expenses for Fuel, 
                    Electricity and Water&Sewer.`);
            _NavigationSection.navigateToExpenseForecast();
            testData.forecastItems.forEach(expense => {
                Income._ExpenseForecastActions.enterForecastItemForecast(expense);   
            });
        });

        it("Test body", () => {
            cy.stepInfo(`3. Navigate to Expense History and Set Expense mode: Electricity and Fuel`);
            _NavigationSection.navigateToExpenseHistory();
            Income._ExpenseHistory.checkUtilitiesExpensesOption(testData.expenseModeElectricityFuel);

            cy.stepInfo(`4. Navigate to Expense Forecast and set Utilities expenses`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.utilitiesFuelElectricityItem);

            cy.stepInfo(`5. Navigate to Pro Forma page and validate: 
                    If Combined Electricity and Fuel on Income > Expense History: the Utilities line item instead
                    of Electricity and Fuel which reflects the Total, PSF, 
                    and per unit forecasted values for the Utilities expense.`);
            _NavigationSection.navigateToProForma();
            Income._ProFormaActions.verifyExpensesCombined(testData.expenseModeElectricityFuel)
                .verifyCategoryTotal(
                    `$${numberWithCommas(Math.round(testData.totalElectricityAndFuel))}`, proFormaTypesEnum.utilities)
                .verifyCategoryTotal(
                    `$${numberWithCommas(Math.round(testData.totalWater))}`, proFormaTypesEnum.waterAndSewer);

            cy.stepInfo(`6. Navigate to Expense History and Set Expense mode: Electricity, Fuel and Water `);
            _NavigationSection.navigateToExpenseHistory();
            Income._ExpenseHistory.checkUtilitiesExpensesOption(testData.expenseModeElectricityFuelWater);
    
            cy.stepInfo(`7. Navigate to Expense Forecast and set Utilities expenses`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.utilitiesFuelElectricityWaterItem);

            cy.stepInfo(`8. Navigate to Pro Forma page and validate: 
                    If Combined Electricity, Fuel, Water & Sewer on Income > Expense History: 
                    the Utilities line item instead of Electricity, Fuel, and Water & Sewer line items which 
                    reflects the Total, PSF, and per unit forecasted values for the Utilities expense.`);
            _NavigationSection.navigateToProForma();
            Income._ProFormaActions.verifyExpensesCombined(testData.expenseModeElectricityFuelWater)
                .verifyCategoryTotal(
                    `$${numberWithCommas(Math.round(testData.totalElectricityFuelWater))}`, 
                    proFormaTypesEnum.utilities);

            cy.stepInfo(`9. Navigate to Expense History and Set Expense mode: Broken Out`);
            _NavigationSection.navigateToExpenseHistory();
            Income._ExpenseHistory.checkUtilitiesExpensesOption(testData.expenseModeBrokenOut);

            cy.stepInfo(`10. Navigate to Pro Forma page and validate: 
                    If Broken Out on Income > Expense History: 
                    no change from current behavior, Electricity, Fuel, and Water & Sewer line items all appear`);
            _NavigationSection.navigateToProForma();
            Income._ProFormaActions.verifyExpensesCombined(testData.expenseModeBrokenOut)
                .verifyCategoryTotal(
                    `$${numberWithCommas(Math.round(testData.totalElectricity))}`, proFormaTypesEnum.electricity)
                .verifyCategoryTotal(`$${numberWithCommas(Math.round(testData.totalFuel))}`, 
                    proFormaTypesEnum.fuel)
                .verifyCategoryTotal(`$${numberWithCommas(Math.round(testData.totalWater))}`, 
                    proFormaTypesEnum.waterAndSewer);
        });
    });