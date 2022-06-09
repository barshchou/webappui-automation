import ReportDataCreator from "../data_creator/reportData.creator";
import Enums from "../../enums/enums";
import { BoweryAutomation } from "../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("createReport", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

export default {
    reportCreationData: _reportCreationData,
    comparableAddress: "200 West 78 Street"
};