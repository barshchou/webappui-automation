import ReportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4234"),
    numberOfUnits: 1,
    labelAndColumn: "Unit Type",
    types: [ "Typical", "Duplex", "Triplex", "Simplex", "Penthouse", "Loft", "Garden Style", "Basement", "Garage", "Townhome" ]
};