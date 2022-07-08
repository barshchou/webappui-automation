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
const _grossBuildingArea = 5000;

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
            testCaseId: 'QA-6164' 
        },
        {
            expenseForecast: _expenseForecastElectricityFixture(),
            testCaseId: 'QA-6164' 
        },
        {
            expenseForecast: _expenseForecastFuelFixture(),
            testCaseId: 'QA-6164' 
        },
        {
            expenseForecast: _expenseForecastGeneralAndAdministrativeFixture(),
            testCaseId: 'QA-6164' 
        },
        {
            expenseForecast: _expenseForecastInsuranceFixture(),
            testCaseId: 'QA-6164' 
        },
        {
            expenseForecast: _expenseForecastLegalAndProfessionalFixture(),
            testCaseId: 'QA-6164' 
        },
        {
            expenseForecast: _expenseForecastManagementFeesFixture(),
            testCaseId: 'QA-6164' 
        },
        {
            expenseForecast: _expenseForecastMiscellaneousFixture(),
            testCaseId: 'QA-6164' 
        },
        {
            expenseForecast: _expenseForecastPayrollAndBenefitsFixture(),
            testCaseId: 'QA-6164' 
        },
        {
            expenseForecast: _expenseForecastRepairAndMaintenanceFixture(),
            testCaseId: 'QA-6164' 
        },
        {
            expenseForecast: _expenseForecastReplacementReserveFixture(),
            testCaseId: 'QA-6164' 
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
    reimbursementType: Enums.REIMBURSEMENT_TYPES.dollarAmount  as BoweryReports.ReimbursementType
};