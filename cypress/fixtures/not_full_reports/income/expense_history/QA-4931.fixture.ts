import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
  reportCreationData: ReportDataCreator.getDefaultReportData("4931"),
  periods: [
    {
      expensePeriod: "Actual",
      year: 2021,
      repairsAndMaintenance: 12675,
    },
    {
      expensePeriod: "Projection",
      year: 2023,
      repairsAndMaintenance: 6754,
    },
  ],
  periodsMonth: [
    {
      expensePeriod: "Actual T12",
      month: "January",
      year: 2021,
      repairsAndMaintenance: 15917,
    },
    {
      expensePeriod: "Annualized Historical",
      month: "September",
      year: 2020,
      repairsAndMaintenance: 9342,
    },
  ],
  repairsItem: {
    name: "repairsAndMaintenance",
    basis: "unit",
  },
};