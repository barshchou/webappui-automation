import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5054");

const _customCategory: BoweryReports.ForecastItem = {
    name: "custom",
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
    customCategory: _customCategory,
    totalToe: "$21,244,410",
    totalToeNetRe: "$21,244,410",
    customTotal: "$8,497,764",
    netOperationIncome: "-$21,244,410",
    reserverstotal: "$4,248,882",
    fuelTotal: "$6,373,323",
    waterAndSewerTotal: "$2,124,441"
};
