import ReportDataCreator from "../../../data_creator/reportData.creator";
import proFormaTypes from "../../../../../cypress/enums/proFormaTypes.enum";



const _customCategory: BoweryReports.ForecastItem = {
    name: "customExpence"
};

const _expensesByDefaultArray = [
    proFormaTypes.insurace,
    proFormaTypes.electricity,
    proFormaTypes.fuel,
    proFormaTypes.waterAndSewer,
    proFormaTypes.repairAndMaintenance,
    proFormaTypes.payrollBenefits,
    proFormaTypes.generalAndAdministrative,
    proFormaTypes.legalAndProfessional,
    proFormaTypes.miscelaneous,
    proFormaTypes.managementFees,
    proFormaTypes.replacementsAndReserves,
];


const expenseForecastInsuranceFixture: BoweryReports.ForecastItem = {
    name: "insurance",
    basis: "sf",
    forecast: 5
};

const expenseForecastElectricityFixture: BoweryReports.ForecastItem = {
    name: "electricity",
    basis: "sf",
    forecast: 5
};

const expenseForecastFuelFixture: BoweryReports.ForecastItem = {
    name: "fuel",
    basis: "sf",
    forecast: 5
};

const expenseForecastWaterAndSewerFixture: BoweryReports.ForecastItem = {
    name: "waterAndSewer",
    basis: "sf",
    forecast: 5
};

const expenseForecastRepairsAndMaintenanceFixture: BoweryReports.ForecastItem = {
    name: "repairsAndMaintenance",
    basis: "sf",
    forecast: 5
};

const expenseForecastPayrollAndBenefitsFixture: BoweryReports.ForecastItem = {
    name: "payrollAndBenefits",
    basis: "sf",
    forecast: 5
};

const expenseForecastGeneralAndAdministrativeFixture: BoweryReports.ForecastItem = {
    name: "generalAndAdministrative",
    basis: "sf",
    forecast: 5
};

const expenseForecastLegalAndProfessionalFeesFixture: BoweryReports.ForecastItem = {
    name: "legalAndProfessionalFees",
    basis: "sf",
    forecast: 5
};

const expenseForecastMiscellaneousFixture: BoweryReports.ForecastItem = {
    name: "miscellaneous",
    basis: "sf",
    forecast: 5
};

const expenseForecastManagementFixture: BoweryReports.ForecastItem = {
    name: "management",
    basis: "sf",
    forecast: 5
};

const expenseForecastReservesFixture: BoweryReports.ForecastItem = {
    name: "reserves",
    basis: "sf",
    forecast: 5
};

const array1 = [expenseForecastInsuranceFixture,
    expenseForecastElectricityFixture,
    expenseForecastFuelFixture,
    expenseForecastWaterAndSewerFixture,
    expenseForecastRepairsAndMaintenanceFixture, 
    expenseForecastPayrollAndBenefitsFixture,
    expenseForecastGeneralAndAdministrativeFixture,
    expenseForecastLegalAndProfessionalFeesFixture,
    expenseForecastMiscellaneousFixture,
    expenseForecastManagementFixture,
    expenseForecastReservesFixture] 



export default {
    reportCreationData: ReportDataCreator.getReportData("5011"),
    customCategory: _customCategory,
    expensesByDefaultArray: _expensesByDefaultArray,
    // expenseForecastInsuranceFixture,
    // expenseForecastElectricityFixture,
    // expenseForecastFuelFixture,
    // expenseForecastWaterAndSewerFixture,
    // expenseForecastRepairsAndMaintenanceFixture, 
    // expenseForecastPayrollAndBenefitsFixture,
    // expenseForecastGeneralAndAdministrativeFixture,
    // expenseForecastLegalAndProfessionalFeesFixture,
    // expenseForecastMiscellaneousFixture,
    // expenseForecastManagementFixture,
    // expenseForecastReservesFixture

    array1
};