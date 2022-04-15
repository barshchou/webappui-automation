import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
  reportCreationData: ReportDataCreator.getDefaultReportData("4931"),
  resUnits: 5,
  periods: [
    {
      expensePeriodType: "Actual",
      year: 2021,
      repairsAndMaintenance: 12675,
    },
    {
      expensePeriodType: "Projection",
      year: 2023,
      repairsAndMaintenance: 6754,
    },
  ],
  periodsMonth: [
    {
      expensePeriodType: "Actual T12",
      month: "January",
      year: 2021,
      repairsAndMaintenance: 15917,
    },
    {
      expensePeriodType: "Annualized Historical",
      month: "September",
      year: 2020,
      repairsAndMaintenance: 9342,
    },
  ],
  repairsItem: {
    name: "repairsAndMaintenance",
    basis: "unit",
  },

  repairsCardSnapshotName: "Repairs_Forecast_Item_Component",
};