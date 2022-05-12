import ReportDataCreator from "../../../data_creator/reportData.creator";

const _repairsItem: BoweryReports.ForecastItem = { name: "repairsAndMaintenance", basis: "unit", };
const _comparables: BoweryReports.Comparable[] = [
    {
      address: "6001 S Sacramento Ave",
      resUnits: 3,
      repairsAndMaintenance: 12675,
    },
    {
      address: "7955 S Emerald Ave",
      resUnits: 2,
      repairsAndMaintenance: 6754,
    },
    {
      address: "7613 S Kingston Ave",
      resUnits: 5,
      repairsAndMaintenance: 15917,
    },
];

export default {
  reportCreationData: ReportDataCreator.getReportData("4932"),
  repairsItem: _repairsItem,
  comparables: _comparables,
  repairsCardSnapshotName: "Repairs_Forecast_Item_Component",
};
