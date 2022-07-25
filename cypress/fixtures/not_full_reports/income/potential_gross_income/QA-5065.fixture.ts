import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";


const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 200,
    numberOfUnits: 1
};

export default {
    reportCreationData: ReportDataCreator.getReportData("5065", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    buildingDescription: _buildingDescription,
    squareFeet: 100,
    utilitiesExpenseOption: "combinedAll" as BoweryReports.UtilityExpenses,
    forecastItemBasis: "utilities" as BoweryReports.ForecastItemBasis,
    utilitiesExpenseForecast: 25,
    expenseType: Enums.PRO_FORMA_TYPES.utilities,
    potentialGrossIncome: Enums.INCOME_TYPES_CELL_NAMES.potentialGrossIncome,
    expenseCellName: Enums.EXPENSE_CELL.utilities,
    reimbursementType: Enums.REIMBURSEMENT_TYPES.dollarAmount as BoweryReports.ReimbursementType,
    knownInformation: Enums.KNOWN_INFORMATION.annual as BoweryReports.KnownInformation,
    columnsId: Enums.REIMBURSEMENT_COLUMN_ID.annual as BoweryReports.ReimbursementColumnsId,
    reimbursementValue: 500,
    vcLossPercentage: 10,
    vcLossDiscussionCommentary: `We have applied a vacancy and collection loss of 10% to ` + 
    `the utilities reimbursement, which has been added to our Pro Forma.`
};