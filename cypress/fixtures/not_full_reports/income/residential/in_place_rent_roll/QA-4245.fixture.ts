import ReportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4245"),
    numberOfUnits: 5,
    columnName: "Monthly Total",
    resUnitsData: [
        {
            leaseStatus: "Occupied",
            rent: 20
        },
        {
            leaseStatus: "Occupied",
            rent: 60
        },
        {
            leaseStatus: "Vacant",
            rent: 100,
        },
        {
            leaseStatus: "Occupied",
            rent: 50
        },
        {
            leaseStatus: "Vacant",
            rent: 70
        }
    ]
};