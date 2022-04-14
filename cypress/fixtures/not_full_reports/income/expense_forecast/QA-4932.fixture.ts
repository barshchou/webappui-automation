import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
  reportCreationData: ReportDataCreator.getDefaultReportData("4932"),
  comparables: [
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
  ],
  repairsItem: {
    name: "repairsAndMaintenance",
    basis: "unit",
  },

  repairsCardSnapshotName: "Repairs_Forecast_Item_Component",
};