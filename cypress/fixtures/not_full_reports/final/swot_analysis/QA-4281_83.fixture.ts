import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4281_83"),
    opportunities: Enums.SWOT_SECTIONS.opportunities,
    typeValue: "test value",
    opportunitiesTexts: [
        "All units are rent stabilized, and there is potential upside upon tenant turnover.",
        "There has been increased demand for similar assets as investors from prime New York" + 
        " Metro submarkets seek higher returns increasing pricing for similar assets."
    ],
};