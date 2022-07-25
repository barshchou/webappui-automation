import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4343_46", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    saleValueConclusion: 90000
};