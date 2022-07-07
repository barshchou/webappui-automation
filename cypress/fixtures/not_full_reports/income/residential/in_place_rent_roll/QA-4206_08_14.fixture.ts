import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

export const reportCreationData = (value: BoweryReports.ConclusionValue) => {
    return ReportDataCreator.getReportData("4206_08_14", { conclusionValue: value });
};

export default {
    conclusionValues: [
        Enums.VALUE_CONCLUSION_TYPE.AS_IS,
        Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
        Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    ] as Array<BoweryReports.ConclusionValue>,
    label: { 
        devForecast: "Developer's Forecast", 
        perRoom: Enums.RENT_ROLL_OPTIONS_CHECKBOXES.include,
        bathrooms: "Bathrooms",
        outSpace: "Outdoor Space",
        unitType: "Unit Type"
    },
    column: { 
        devForecast: "Rent Forecast",  
        perRoom: "Rooms",
        bathrooms: "# Bathrooms",
        outSpace: "Outdoor Space",
        unitType: "Unit Type"
    }
};