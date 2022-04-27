import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5052");
};

const _firstCustomCategory: BoweryReports.ForecastItem = {
    name: "firstcustom",
    basis: "sf",
    forecast: 1.22
};

const _secondCustomCategory: BoweryReports.ForecastItem = {
    name: "secondcustom",
    basis: "sf",
    forecast: 1.22
};

//Making changes to forecast will impact totals amount in exported values: totalToe, totalToeNetRe, customTotal
const expensesItemsFixture = (): BoweryReports.ForecastItem[] => {
    return [
        {
            name: "insurance",
            basis: "sf",
            forecast: 0.1
        },
        {
            name: "electricity",
            basis: "sf",
            forecast: 0.2
        },
        {
            name: "fuel",
            basis: "sf",
            forecast: 0.15
        },
        {
            name: "waterAndSewer",
            basis: "sf",
            forecast: 0.16
        },
        {
            name: "repairsAndMaintenance",
            basis: "sf",
            forecast: 0.17
        },
        {
            name: "payrollAndBenefits",
            basis: "sf",
            forecast: 0.18
        },
        {
            name: "generalAndAdministrative",
            basis: "sf",
            forecast: 0.19
        },
        {
            name: "legalAndProfessionalFees",
            basis: "sf",
            forecast: 0.20
        },
        {
            name: "miscellaneous",
            basis: "sf",
            forecast: 0.21
        },
        {
            name: "management",
            basis: "sf",
            forecast: 0.22
        },
        {
            name: "reserves",
            basis: "sf",
            forecast: 0.23
        },
        {
            name: "total",
            basis: "sf",
            forecast: 2.01
        },
    ];
};

const totalExpensesCommentariesFixture = () => {
    return {
        generatedPerSF: "Operating expenses, exclusive of real estate taxes, were forecasted at $2.01 per square foot and $NaN per unit. " +
        "Excluding real estate taxes, the comparables ranged from $3.99 to $5.63 per square foot and $3,621 to $3,905 per unit. "+ 
        "Our forecast is near the comparable range on both a per square foot and per unit basis, as well as logically placed in " +
        "relation to the historical performance of the asset. Thus, this forecast is reasonable and will be applied in our valuation analysis."
    };
};


export default {
    reportCreationData: reportCreationFixture(),
    firstCustomCategory: _firstCustomCategory, 
    secondCustomCategory: _secondCustomCategory,
    expensesItems: expensesItemsFixture(),
    commentaryTotalExpenses: Object.freeze(totalExpensesCommentariesFixture()),
    totalExpensesSnapshotName: "Total_Expenses_Forecast_Item_Component"
};