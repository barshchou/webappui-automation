import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";
import expensesCardNames from " ../../../cypress/enums/expense/expensesForecastCardNames.enum";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import unitSFEnum from "../../../../../enums/unit/unitSF.enum";
import expensesCellNames from "../../../../../enums/expense/expenseCellNames";
import proFormaTypesEnum from "../../../../../enums/proFormaTypes.enum";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("QA-5989-90", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _numberOfCommercialUnits = 3;
const _commercialUnitSquareFootage = 500;
const _grossBuildingArea = 5000.12;
const _percentOfTotal = [ 5, 6, 7 ];

const _commercialUnits = () => {
    return {
        commercialUnitsNumber: _numberOfCommercialUnits,
        unitsSF: [ _commercialUnitSquareFootage, _commercialUnitSquareFootage, _commercialUnitSquareFootage ]
    };
};

const setExpenseForecastFixture = (name: string, basis: BoweryReports.UnitSF, 
    forecast: number | undefined, cardName: BoweryReports.ExpenseCardNames, 
    expenseUIName: BoweryReports.ProFormaTypes): BoweryReports.ForecastItem => {
    return { name, basis, forecast, cardName, expenseUIName };
};

const _expensesForecast = () => { 
    return [
        {
            expenseForecast: setExpenseForecastFixture(
                expensesCellNames.utilities,
                unitSFEnum.sf,
                5,
                expensesCardNames.utilities,
                proFormaTypesEnum.utilities
            ),
            testCaseIds: 'QA-5989 & QA-5990' 
        }
    ];
};

export default {
    reportCreationData: reportCreationFixture(),
    numberOfCommercialUnits: _numberOfCommercialUnits,
    commercialUnitSquareFootage: _commercialUnitSquareFootage,
    grossBuildingArea: _grossBuildingArea,
    commercialUnits: _commercialUnits(),
    expensesForecast: _expensesForecast(),
    reimbursementType: Enums.REIMBURSEMENT_TYPES.percentOfAppraiserForecast as BoweryReports.ReimbursementType,
    reimbursementColumnId: Enums.REIMBURSEMENT_COLUMN_ID.percentOfAppraiserForecast,
    knownInformation: Enums.KNOWN_INFORMATION.adminFee as BoweryReports.KnownInformation,
    percentOfTotal: _percentOfTotal,
    utilitiesExpenseOption: "combinedAll" as BoweryReports.UtilityExpenses,
};