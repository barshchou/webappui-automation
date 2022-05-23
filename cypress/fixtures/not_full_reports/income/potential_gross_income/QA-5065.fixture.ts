import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";


const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 200,
    numberOfUnits: 1
};

export default {
    reportCreationData: ReportDataCreator.getReportData("5065", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    }),
    buildingDescription: _buildingDescription,
    squareFeet: 100,
    utiliesExpenseOption: "combinedAll" as BoweryReports.UtilityExpenses,
    forecastItemBasis: "utilities" as BoweryReports.ForecastItemBasis,
    utilitiesExpenseForecast: 25,
    vcLossPercentage: 10
};