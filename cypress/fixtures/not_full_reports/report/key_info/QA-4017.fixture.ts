import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getFullDate } from "../../../../../utils/date.utils";

const _currentDate = () => {
    return getFullDate();
};


export default {
    reportCreationData: ReportDataCreator.getReportData("4017"),
    dateOfInspectionRowName: "Date of Inspection",
    dateOfTheReportRowName: "Date of the Report",
    currentDate: _currentDate()
};