import residentialManager from "./residential/residential.manager";
import commercialManager from "./commercial/commercial.manager";
import miscellaneousManager from "./miscellaneous/miscellaneous.manager";
import capRateConclusionActions from "./capRateConclusion.actions";
import potentialGrossIncomeActions from "./potentialGrossIncome.actions";
import taxInfoActions from "./taxInfo.actions";
import expenseHistoryActions from "./expenseHistory.actions";
import comparableExpensesActions from "./comparableExpenses.actions";
import expenseForecastActions from "./expenseForecast.actions";
import proFormaActions from "./proForma.actions";
import supportingCapRatesActions from "./supportingCapRates.actions";

export default {
    Residential: residentialManager,
    Commercial: commercialManager,
    Miscellaneous: miscellaneousManager,
    CapRateConclusion: capRateConclusionActions,
    PotentialGrossIncome: potentialGrossIncomeActions,
    TaxInfo: taxInfoActions,
    ExpenseHistory: expenseHistoryActions,
    ComparableExpenses: comparableExpensesActions,
    ExpenseForecast: expenseForecastActions,
    ProForma: proFormaActions,
    SupportingCapRates: supportingCapRatesActions
};