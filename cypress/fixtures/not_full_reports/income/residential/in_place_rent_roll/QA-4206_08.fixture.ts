import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

export const reportCreationData = (value: BoweryReports.ConclusionValue) => {
    return ReportDataCreator.getReportData("4206_08", { conclusionValue: value });
};

export default {
    conclusionValues: [
        Enums.VALUE_CONCLUSION_TYPE.AS_IS,
        Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
        Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    ] as Array<BoweryReports.ConclusionValue>,
    label: { 
        devForecast: "Developer's Forecast", 
        perRoom: "Include Per Room Analysis in Report",
    },
    column: { 
        devForecast: "Rent Forecast",  
        perRoom: "Rooms", 
    }
};