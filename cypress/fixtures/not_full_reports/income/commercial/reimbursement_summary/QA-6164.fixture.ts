import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";
import expensesCardNames from " ../../../cypress/enums/expense/expensesForecastCardNames.enum";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import unitSFEnum from "../../../../../enums/unit/unitSF.enum";
import expensesCellNames from "../../../../../enums/expense/expenseCellNames";
import proFormaTypesEnum from "../../../../../enums/proFormaTypes.enum";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("6164", {
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

const _expenseForecastWaterAndSewerFixture = (): BoweryReports.ForecastItem => {
    return {
        name: expensesCellNames.waterAndSewer,
        basis: unitSFEnum.sf,
        forecast: 2,
        cardName: expensesCardNames.waterAndSewer,
        expenseUIName: proFormaTypesEnum.waterAndSewer
    };
};

const _expenseForecastReplacementReserveFixture = (): BoweryReports.ForecastItem => {
    return {
        name: expensesCellNames.replacementsAndReserves,
        basis: unitSFEnum.sf,
        forecast: 2,
        cardName: expensesCardNames.replacementsAndReserves,
        expenseUIName: proFormaTypesEnum.replacementsAndReserves
    };
};

const _expenseForecastInsuranceFixture = (): BoweryReports.ForecastItem => {
    return {
        name: expensesCellNames.insurance,
        basis: unitSFEnum.sf,
        forecast: 4,
        cardName: expensesCardNames.insurance,
        expenseUIName: proFormaTypesEnum.insurance
    };
};

const _expenseForecastPayrollAndBenefitsFixture = (): BoweryReports.ForecastItem => {
    return {
        name: expensesCellNames.payrollBenefits,
        basis: unitSFEnum.sf,
        forecast: 4,
        cardName: expensesCardNames.payrollBenefits,
        expenseUIName: proFormaTypesEnum.payrollBenefits
    };
};

const _expenseForecastRepairAndMaintenanceFixture = (): BoweryReports.ForecastItem => {
    return {
        name: expensesCellNames.repairAndMaintenance,
        basis: unitSFEnum.sf,
        forecast: 2.1,
        cardName: expensesCardNames.repairAndMaintenance,
        expenseUIName: proFormaTypesEnum.repairAndMaintenance
    };
};

const _expenseForecastElectricityFixture = (): BoweryReports.ForecastItem => {
    return {
        name: expensesCellNames.electricity,
        basis: unitSFEnum.sf,
        forecast: 5,
        cardName: expensesCardNames.electricity,
        expenseUIName: proFormaTypesEnum.electricity,
    };
};

const _expenseForecastGeneralAndAdministrativeFixture = (): BoweryReports.ForecastItem => {
    return {
        name: expensesCellNames.generalAndAdministrative,
        basis: unitSFEnum.sf,
        forecast: 5,
        cardName: expensesCardNames.generalAndAdministrative,
        expenseUIName: proFormaTypesEnum.generalAndAdministrative
    };
};

const _expenseForecastMiscellaneousFixture = (): BoweryReports.ForecastItem => {
    return {
        name: expensesCellNames.miscellaneous,
        basis: unitSFEnum.sf,
        forecast: 5,
        cardName: expensesCardNames.miscellaneous,
        expenseUIName: proFormaTypesEnum.miscellaneous
    };
};

const _expenseForecastManagementFeesFixture = (): BoweryReports.ForecastItem => {
    return {
        name: expensesCellNames.managementFees,
        basis: unitSFEnum.sf,
        forecast: 5,
        cardName: expensesCardNames.managementFees,
        expenseUIName: proFormaTypesEnum.managementFees
    };
};

const _expenseForecastFuelFixture = (): BoweryReports.ForecastItem => {
    return {
        name: expensesCellNames.fuel,
        basis: unitSFEnum.sf,
        forecast: 5,
        cardName: expensesCardNames.fuel,
        expenseUIName: proFormaTypesEnum.fuel
    };
};

const _expenseForecastLegalAndProfessionalFixture = (): BoweryReports.ForecastItem => {
    return {
        name: expensesCellNames.legalAndProfessional,
        basis: unitSFEnum.sf,
        forecast: 6,
        cardName: expensesCardNames.legalAndProfessional,
        expenseUIName: proFormaTypesEnum.legalAndProfessional
    };
};

const _expensesForecast = () => { //BoweryReports.ForecastItem[]
    return [ { 
            expenseForecast: _expenseForecastWaterAndSewerFixture(),
            testCaseIds: 'QA-5971 & QA-5972' 
        },
        {
            expenseForecast: _expenseForecastElectricityFixture(),
            testCaseIds: 'QA-5967 & QA-5968' 
        },
        {
            expenseForecast: _expenseForecastFuelFixture(),
            testCaseIds: 'QA-5969 & QA-5970' 
        },
        {
            expenseForecast: _expenseForecastGeneralAndAdministrativeFixture(),
            testCaseIds: 'QA-5977 & QA-5978' 
        },
        {
            expenseForecast: _expenseForecastInsuranceFixture(),
            testCaseIds: 'QA-5964 & QA-5966' 
        },
        {
            expenseForecast: _expenseForecastLegalAndProfessionalFixture(),
            testCaseIds: 'QA-5979 & QA-5980' 
        },
        {
            expenseForecast: _expenseForecastManagementFeesFixture(),
            testCaseIds: 'QA-5983 & QA-5984' 
        },
        {
            expenseForecast: _expenseForecastMiscellaneousFixture(),
            testCaseIds: 'QA-5981 & QA-5982' 
        },
        {
            expenseForecast: _expenseForecastPayrollAndBenefitsFixture(),
            testCaseIds: 'QA-5975 & QA-5976' 
        },
        {
            expenseForecast: _expenseForecastRepairAndMaintenanceFixture(),
            testCaseIds: 'QA-5973 & QA-5974' 
        },
        {
            expenseForecast: _expenseForecastReplacementReserveFixture(),
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