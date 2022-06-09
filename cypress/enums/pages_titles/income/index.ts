import residentialTitlesEnum from "./residentialTitles.enum";
import commercialTitlesEnum from "./commercialTitles.enum";
import miscellaneousTitlesEnum from "./miscellaneousTitles.enum";

const titles = {
    _Residential: residentialTitlesEnum,
    _Commercial: commercialTitlesEnum,
    _Miscellaneous: miscellaneousTitlesEnum,
    POTENTIAL_GROSS_INCOME: "Potential Gross Income",
    TAX_INFO: "Tax Information",
    EXPENSE_HISTORY: "Expense History",
    COMPARABLE_EXPENSES: "Expense Comparables",
    EXPENSE_FORECAST: "Expense Forecast",
    PRO_FORMA: "Pro Forma",
    SUPPORTING_CAP_RATES: "Supporting Cap Rates",
    CAP_RATE_CONCLUSION: "Cap Rate Conclusion"
};

export default Object.freeze(titles);