import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4172", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    }),
    filePath: "not_full_reports/CostarExport.csv",
    compsNumber: 6
};