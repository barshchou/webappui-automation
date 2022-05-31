import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5053-54");

const _customCategoryFirstCapital: BoweryReports.ForecastItem = {
    name: "Verify first capital",
    basis: "sf",
    forecast: 4
};

const _customCategoryAllCapitals: BoweryReports.ForecastItem = {
    name: "Verify All Capitals",
    basis: "sf",
    forecast: 4
};

const _customCategoryMix: BoweryReports.ForecastItem = {
    name: "verify Mix cases",
    basis: "sf",
    forecast: 4
};

//Making changes to forecast will impact totals amount in exported values: totalToe, totalToeNetRe, customTotal
const expensesItemsFixture = (): BoweryReports.ForecastItem[] => {
    return [
        {
            name: "waterAndSewer",
            basis: "sf",
            forecast: 1
        },
        {
            name: "reserves",
            basis: "sf",
            forecast: 2
        },
        {
            name: "fuel",
            basis: "sf",
            forecast: 3
        },
    ];
};

export default {
    reportCreationData: _reportCreationData,
    expensesItems: expensesItemsFixture(),
    customCategoryFirstCapital: _customCategoryFirstCapital,
    customCategoryAllCapitals: _customCategoryAllCapitals,
    customCategoryMix: _customCategoryMix,
    totalToe: "$21,244,410",
    totalToeNetRe: "$21,244,410",
    customTotal: "$8,497,764",
    netOperationIncome: "-$21,244,410",
    reserverstotal: "$4,248,882",
    fuelTotal: "$6,373,323",
    waterAndSewerTotal: "$2,124,441"
};
