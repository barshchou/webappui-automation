import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getCurrentMonthName, getYearFromDate } from "../../../../../utils/date.utils";

const _actualWaterAndSewerItem: BoweryReports.ForecastItem =  {
  name: "waterAndSewer",
  basis: "sf",
  projection: 10000
}; 

const _t12WaterAndSewerItem: BoweryReports.ForecastItem = {
  name: "waterAndSewer",
  basis: "sf",
  projection: 13000
};

const _historicalWaterAndSewerItem: BoweryReports.ForecastItem = {
  name: "waterAndSewer",
  basis: "sf",
  projection: 15000
};

const _ownerProjectionWaterAndSewerItem: BoweryReports.ForecastItem = {
  name: "waterAndSewer",
  basis: "sf",
  projection: 17000
};

const _buildingDescription: BoweryReports.BuildingDescription = {
  grossArea: 2500,
  numberOfUnits: 5,
};

export default {
  reportCreationData: ReportDataCreator.getReportData("4898"),
  actualWaterAndSewerItem: _actualWaterAndSewerItem,
  t12WaterAndSewerItem: _t12WaterAndSewerItem,
  historicalWaterAndSewerItem: _historicalWaterAndSewerItem,
  ownerProjectionWaterAndSewerItem: _ownerProjectionWaterAndSewerItem,
  buildingDescription: _buildingDescription,
  periods: [
    {
      expensePeriodType: "Actual",
      year: Number(getYearFromDate()) - 1,
      waterAndSewer: 10000,
    },
    {
      expensePeriodType: "Projection",
      year: Number(getYearFromDate()) + 1,
      waterAndSewer: 17000,
    },
  ],
  periodsMonth: [
    {
      expensePeriodType: "Actual T12",
      month:getCurrentMonthName(),
      year: getYearFromDate(),
      waterAndSewer: 13000,
    },
    {
      expensePeriodType: "Annualized Historical",
      month: getCurrentMonthName(),
      year: getYearFromDate(),
      waterAndSewer: 15000,
    },
  ],

  waterAndSewerCardSnapshotName: "WaterAndSewer_Forecast_Item_Component",
};