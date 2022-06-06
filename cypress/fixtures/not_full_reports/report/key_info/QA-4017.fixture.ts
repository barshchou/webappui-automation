import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getCurrentMonthName } from "../../../../../utils/date.utils";

const _currentDate = () => {
    let currentDate = getCurrentMonthName()
        .substring(4)
        .replaceAll(" ", ", ")
        .replace(", ", " ");
    return currentDate;
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4017"),
    dateOfInspectionRowName: "Date of Inspection",
    dateOfTheReportRowName: "Date of the Report",
    currentDate: _currentDate()
};