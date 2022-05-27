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
    expenseType: Enums.PRO_FORMA_TYPES.utilities,
    potentialGrossIncome: Enums.INCOME_TYPES_CELL_NAMES.potentialGrossIncome,
    expenseCellName: Enums.EXPENSE_CELL.utilities,
    reimbursementType: Enums.REIMBURSEMENT_TYPES.dollarAmount,
    knownInformation: "Annual",
    reimbursementValue: 500,
    vcLossPercentage: 10,
    vcLossDiscussionCommentary: `We have applied a vacancy and collection loss of 10% to the utilities reimbursement, which has been added to our Pro Forma.`
};