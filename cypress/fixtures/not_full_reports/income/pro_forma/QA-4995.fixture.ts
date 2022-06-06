import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getYearFromDate } from "../../../../../utils/date.utils";

const _basis = "sf" as BoweryReports.UnitSF;

const _actualInsuranceItem: BoweryReports.ForecastItem =  {
  name: "insurance",
  basis: _basis,
  projection: 10000
}; 

const _t12InsuranceItem: BoweryReports.ForecastItem = {
  name: "insurance",
  basis: _basis,
  projection: 13000
};

const _historicalInsuranceItem: BoweryReports.ForecastItem = {
  name: "insurance",
  basis: _basis,
  projection: 15000
};

const _ownerProjectionInsuranceItem: BoweryReports.ForecastItem = {
  name: "insurance",
  basis: _basis,
  projection: 17000
};

const _buildingDescription: BoweryReports.BuildingDescription = {
  grossArea: 2500,
  numberOfUnits: 5,
};

const _periods = {
        expensePeriodType: "Actual",
        year: Number(getYearFromDate()) - 1,
        insurance: 10000,
};

const _expenseModeElectricityFuel = "combinedElectricityAndFuel";
const _expenseModeElectricityFuelWater = "combinedAll";
const _expenseModeBrokenOut = "brokenOut";

export default {
    reportCreationData: ReportDataCreator.getReportData("4519"),
    actualInsuranceItem: _actualInsuranceItem,
    t12InsuranceItem: _t12InsuranceItem,
    historicalInsuranceItem: _historicalInsuranceItem,
    ownerProjectionInsuranceItem: _ownerProjectionInsuranceItem,
    buildingDescription: _buildingDescription,
    periods: _periods,
    insurancePerSfCardSnapshotName: "Insurance_PerSF_Forecast_Item_Component",
    basis: _basis,
    expenseModeElectricityFuelWater: _expenseModeElectricityFuelWater,
    expenseModeBrokenOut: _expenseModeBrokenOut,
    expenseModeElectricityFuel: _expenseModeElectricityFuel
};