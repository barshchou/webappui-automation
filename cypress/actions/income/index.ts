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


export const _Residential = residentialManager;
export const _CommercialManager = commercialManager;
export const _MiscellaneousManager = miscellaneousManager;
export const _CapRateConclusion = capRateConclusionActions;
export const _PotentialGrossIncome = potentialGrossIncomeActions;
export const _TaxInfo = taxInfoActions;
export const _ExpenseHistory = expenseHistoryActions;
export const _ComparableExpenses = comparableExpensesActions;
export const _ExpenseForecastActions = expenseForecastActions;
export const _ProFormaActions = proFormaActions;
export const _SupportingCapRatesActions = supportingCapRatesActions;