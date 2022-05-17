import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4169", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    }),
};