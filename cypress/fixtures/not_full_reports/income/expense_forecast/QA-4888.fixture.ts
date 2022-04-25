import ReportDataCreator from "../../../data_creator/reportData.creator";
import {getCurrentMonthName, getYearFromDate} from "../../../../../utils/date.utils";

const _actualElectricityItem: BoweryReports.ForecastItem =  {
  name: "electricity",
  basis: "unit",
  projection: 10000
}; 

const _t12ElectricityItem: BoweryReports.ForecastItem = {
  name: "electricity",
  basis: "unit",
  projection: 13000
};

const _historicalElectricityItem: BoweryReports.ForecastItem = {
  name: "electricity",
  basis: "unit",
  projection: 15000
};

const _ownerProjectionElectricityItem: BoweryReports.ForecastItem = {
  name: "electricity",
  basis: "unit",
  projection: 17000
};

const _buildingDescription: BoweryReports.BuildingDescription = {
  grossArea: 2500,
  numberOfUnits: 5,
};

export default {
  reportCreationData: ReportDataCreator.getDefaultReportData("4888"),
  actualElectricityItem: _actualElectricityItem,
  t12ElectricityItem: _t12ElectricityItem,
  historicalElectricityItem: _historicalElectricityItem,
  ownerProjectionElectricityItem: _ownerProjectionElectricityItem,
  buildingDescription: _buildingDescription,
  periods: [
    {
      expensePeriodType: "Actual",
      year: Number(getYearFromDate()) - 1,
      electricity: 10000,
    },
    {
      expensePeriodType: "Projection",
      year: Number(getYearFromDate()) + 1,
      electricity: 17000,
    },
  ],
  periodsMonth: [
    {
      expensePeriodType: "Actual T12",
      month:getCurrentMonthName(),
      year: getYearFromDate(),
      electricity: 13000,
    },
    {
      expensePeriodType: "Annualized Historical",
      month: getCurrentMonthName(),
      year: getYearFromDate(),
      electricity: 15000,
    },
  ],

  electricityCardSnapshotName: "Electricity_Forecast_Item_Component",
};