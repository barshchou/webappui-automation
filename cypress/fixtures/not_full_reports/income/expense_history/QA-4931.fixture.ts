import ReportDataCreator from "../../../data_creator/reportData.creator";
import {getCurrentMonthName, getYearFromDate} from "../../../../../utils/date.utils";

const _repairsHistoryItem: BoweryReports.ForecastItem = {
  reportCreationData: ReportDataCreator.getDefaultReportData("4931"),
  buildingDescription: {
    grossArea: 2000,
    numberOfUnits: 5,
  },
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
  actualRepairsItem: {
    name: "repairsAndMaintenance",
    basis: "unit",
    projection: 12000
},
  t12RepairsItem: {
    name: "repairsAndMaintenance",
    basis: "unit",
    projection: 13000
},
  historicalRepairsItem: {
  name: "repairsAndMaintenance",
  basis: "unit",
  projection: 14000
},
  ownerProjectionRepairsItem: {
  name: "repairsAndMaintenance",
  basis: "unit",
  projection: 15000
},

  repairsCardSnapshotName: "Repairs_Forecast_Item_Component",
};

export default _repairsHistoryItem;