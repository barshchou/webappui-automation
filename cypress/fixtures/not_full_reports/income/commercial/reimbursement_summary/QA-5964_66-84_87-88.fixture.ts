import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";
import expensesCardNames from " ../../../cypress/enums/expense/expensesForecastCardNames.enum";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import unitSFEnum from "../../../../../enums/unit/unitSF.enum";
import expensesCellNames from "../../../../../enums/expense/expenseCellNames";
import proFormaTypesEnum from "../../../../../enums/proFormaTypes.enum";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("QA-5964_66-84_87-88", {
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
    return [ { 
            expenseForecast: setExpenseForecastFixture(
                expensesCellNames.waterAndSewer,
                unitSFEnum.sf,
                2,
                expensesCardNames.waterAndSewer,
                proFormaTypesEnum.waterAndSewer
            ),
            testCaseIds: 'QA-5971 & QA-5972' 
        },
        {
            expenseForecast: setExpenseForecastFixture(
                expensesCellNames.replacementsAndReserves,
                unitSFEnum.sf,
                7,
                expensesCardNames.replacementsAndReserves,
                proFormaTypesEnum.replacementsAndReserves
            ),
            testCaseIds: 'QA-5967 & QA-5968' 
        },
        {
            expenseForecast: setExpenseForecastFixture(
                expensesCellNames.insurance,
                unitSFEnum.sf,
                3,
                expensesCardNames.insurance,
                proFormaTypesEnum.insurance
            ),
            testCaseIds: 'QA-5969 & QA-5970' 
        },
        {
            expenseForecast: setExpenseForecastFixture(
                expensesCellNames.payrollBenefits,
                unitSFEnum.sf,
                4,
                expensesCardNames.payrollBenefits,
                proFormaTypesEnum.payrollBenefits
            ),
            testCaseIds: 'QA-5977 & QA-5978' 
        },
        {
            expenseForecast: setExpenseForecastFixture(
                expensesCellNames.repairAndMaintenance,
                unitSFEnum.sf,
                2.1,
                expensesCardNames.repairAndMaintenance,
                proFormaTypesEnum.repairAndMaintenance
            ),
            testCaseIds: 'QA-5964 & QA-5966' 
        },
        {
            expenseForecast: setExpenseForecastFixture(
                expensesCellNames.electricity,
                unitSFEnum.sf,
                5,
                expensesCardNames.electricity,
                proFormaTypesEnum.electricity
            ),
            testCaseIds: 'QA-5979 & QA-5980' 
        },
        {
            expenseForecast: setExpenseForecastFixture(
                expensesCellNames.generalAndAdministrative,
                unitSFEnum.sf,
                5,
                expensesCardNames.generalAndAdministrative,
                proFormaTypesEnum.generalAndAdministrative
            ),
            testCaseIds: 'QA-5983 & QA-5984' 
        },
        {
            expenseForecast: setExpenseForecastFixture(
                expensesCellNames.miscellaneous,
                unitSFEnum.sf,
                5,
                expensesCardNames.miscellaneous,
                proFormaTypesEnum.miscellaneous
            ),
            testCaseIds: 'QA-5981 & QA-5982' 
        },
        {
            expenseForecast: setExpenseForecastFixture(
                expensesCellNames.managementFees,
                unitSFEnum.sf,
                5,
                expensesCardNames.managementFees,
                proFormaTypesEnum.managementFees
            ),
            testCaseIds: 'QA-5975 & QA-5976' 
        },
        {
            expenseForecast: setExpenseForecastFixture(
                expensesCellNames.fuel,
                unitSFEnum.sf,
                5,
                expensesCardNames.fuel,
                proFormaTypesEnum.fuel
            ),
            testCaseIds: 'QA-5973 & QA-5974' 
        },
        {
            expenseForecast: setExpenseForecastFixture(
                expensesCellNames.legalAndProfessional,
                unitSFEnum.sf,
                6,
                expensesCardNames.legalAndProfessional,
                proFormaTypesEnum.legalAndProfessional
            ),
            testCaseIds: 'QA-5987 & QA-5988' 
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
    percentOfTotal: _percentOfTotal
};