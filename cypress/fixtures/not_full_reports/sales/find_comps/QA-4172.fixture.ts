import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4172", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    filePath: "test_files/CostarExport.csv",
    compsNumber: 6
};