import ReportDataCreator from "../data_creator/reportData.creator";
import Enums from "../../enums/enums";
import { BoweryAutomation } from "../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("createReport", {
    incomeValue: Enums.INCOME_TYPE.both,
    templateValue: Enums.TEMPLATE_TYPE.freddieMac,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

export default {
    reportCreationData: _reportCreationData
};