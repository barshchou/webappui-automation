import ReportDataCreator from "../../../data_creator/reportData.creator";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import { BoweryReports } from "../../../../types/boweryReports.type";
import expensesForecastCardNamesEnum from "../../../../enums/expense/expensesForecastCardNames.enum";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5011_12", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2500,
    numberOfUnits: 1,
};

const _numberOfCommercialUnits = 2;
const _numberOfResidentialUnits = 1;

const rentRollResidentialUnitFixture = (): BoweryReports.ResidentialUnit => {
    return {
        rooms: 5,
        monthlyRent: 400
    };
};

const commentariesFixture = () => {
    return {
        generated: "Operating expenses, exclusive of real estate taxes, were forecasted at $0.00 " + 
        "per square foot and $0 per unit. Excluding real estate taxes, the comparables ranged from " + 
        "Comp totals map psf min to Comp totals map psf max per square foot and Comp totals map unit min to " +
        "Comp totals map unit max per unit. Our forecast is near the comparable range on both a per " + 
        "square foot and per unit basis, as well as logically placed in relation to the historical " + 
        "performance of the asset. Thus, this forecast is reasonable and will be applied in our valuation analysis.",
    };
};

const _forecastPSFnotIncluded = '$0.00';
const _forecastPerUnitNotIncluded = '$0';

const _expensesInProFormaByDefaultArray = [
    proFormaTypes.insurance,
    proFormaTypes.electricity,
    proFormaTypes.fuel,
    proFormaTypes.waterAndSewer,
    proFormaTypes.repairAndMaintenance,
    proFormaTypes.payrollBenefits,
    proFormaTypes.generalAndAdministrative,
    proFormaTypes.legalAndProfessional,
    proFormaTypes.miscellaneous,
    proFormaTypes.managementFees,
    proFormaTypes.replacementsAndReserves,
];

const _expensesForecastCardNamesArray = [
    expensesForecastCardNamesEnum.insurance,
    expensesForecastCardNamesEnum.electricity,
    expensesForecastCardNamesEnum.fuel,
    expensesForecastCardNamesEnum.waterAndSewer,
    expensesForecastCardNamesEnum.repairAndMaintenance,
    expensesForecastCardNamesEnum.payrollBenefits,
    expensesForecastCardNamesEnum.generalAndAdministrative,
    expensesForecastCardNamesEnum.legalAndProfessional,
    expensesForecastCardNamesEnum.miscellaneous,
    expensesForecastCardNamesEnum.managementFees,
    expensesForecastCardNamesEnum.replacementsAndReserves,
];

const expenseForecastInsuranceFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "insurance",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 30
    };
};

const expenseForecastElectricityFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "electricity",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 1451.5
    };
};

const expenseForecastFuelFixture = (_basis: "unit" | "room" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "fuel",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 150
    };
};

const expenseForecastWaterAndSewerFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "waterAndSewer",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 30
    };
};

const expenseForecastRepairsAndMaintenanceFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "repairsAndMaintenance",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 1880
    };
};

const expenseForecastPayrollAndBenefitsFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "payrollAndBenefits",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 30
    };
};

const expenseForecastGeneralAndAdministrativeFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "generalAndAdministrative",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 543
    };
};

const expenseForecastLegalAndProfessionalFeesFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "legalAndProfessionalFees",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 30
    };
};

const expenseForecastMiscellaneousFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "miscellaneous",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 123.12
    };
};

const expenseForecastManagementFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "management",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 1
    };
};

const expenseForecastReservesFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "reserves",
        basis: _basis as BoweryReports.UnitSF,
        forecast: 0.58
    };
};

const expenseForecastTotalFixture = (_basis: "unit" | "sf"): BoweryReports.ForecastItem => {
    return {
        name: "total",
        basis: _basis as BoweryReports.UnitSF,
    };
};

const expenseForecastFixtureArray = (basis?: "unit" | "sf"): Array<BoweryReports.ForecastItem> => {
    return [ expenseForecastInsuranceFixture(basis),
        expenseForecastElectricityFixture(basis),
        expenseForecastFuelFixture(basis),
        expenseForecastWaterAndSewerFixture(basis),
        expenseForecastRepairsAndMaintenanceFixture(basis),
        expenseForecastPayrollAndBenefitsFixture(basis),
        expenseForecastGeneralAndAdministrativeFixture(basis),
        expenseForecastLegalAndProfessionalFeesFixture(basis),
        expenseForecastMiscellaneousFixture(basis),
        expenseForecastManagementFixture(basis),
        expenseForecastReservesFixture(basis) ];
};

export default {
    reportCreationData: _reportCreationData,
    buildingDescription: _buildingDescription,
    expensesInProFormaByDefaultArray: _expensesInProFormaByDefaultArray,
    expenseForecastFuelFixture,
    expenseForecastTotalFixture,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    expenseForecastFixtureArray,
    commentaries: Object.freeze(commentariesFixture()),
    forecastPSFnotIncluded: _forecastPSFnotIncluded,
    forecastPerUnitNotIncluded: _forecastPerUnitNotIncluded,
    rentRollResUnitFixture: rentRollResidentialUnitFixture(),
    perRoomAnalysis: "Include Per Room Analysis in Report",
    expensesForecastCardNamesArray: _expensesForecastCardNamesArray
};