import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getCurrentMonthName, getYearFromDate } from "../../../../../utils/date.utils";
import { BoweryReports } from "../../../../types/boweryReports.type";

const _actualRepairsItem: BoweryReports.ForecastItem =  {
  name: "repairsAndMaintenance",
  basis: "unit",
  projection: 12000
}; 

const _t12RepairsItem: BoweryReports.ForecastItem = {
  name: "repairsAndMaintenance",
  basis: "unit",
  projection: 13000
};

const _historicalRepairsItem: BoweryReports.ForecastItem = {
  name: "repairsAndMaintenance",
  basis: "unit",
  projection: 14000
};

const _ownerProjectionRepairsItem: BoweryReports.ForecastItem = {
  name: "repairsAndMaintenance",
  basis: "unit",
  projection: 15000
};

const _buildingDescription: BoweryReports.BuildingDescription = {
  grossArea: 2000,
  numberOfUnits: 5,
};

export default {
  reportCreationData: ReportDataCreator.getReportData("4931"),
  actualRepairsItem: _actualRepairsItem,
  t12RepairsItem: _t12RepairsItem,
  historicalRepairsItem: _historicalRepairsItem,
  ownerProjectionRepairsItem: _ownerProjectionRepairsItem,
  buildingDescription: _buildingDescription,
  periods: [
    {
      expensePeriodType: "Actual",
      year: Number(getYearFromDate()) - 1,
      repairsAndMaintenance: 12000,
    },
    {
      expensePeriodType: "Projection",
      year: Number(getYearFromDate()) + 1,
      repairsAndMaintenance: 15000,
    },
  ],
  periodsMonth: [
    {
      expensePeriodType: "Actual T12",
      month:getCurrentMonthName(),
      year: getYearFromDate(),
      repairsAndMaintenance: 13000,
    },
    {
      expensePeriodType: "Annualized Historical",
      month: getCurrentMonthName(),
      year: getYearFromDate(),
      repairsAndMaintenance: 14000,
    },
  ],

  repairsCardSnapshotName: "Repairs_Forecast_Item_Component",
};
