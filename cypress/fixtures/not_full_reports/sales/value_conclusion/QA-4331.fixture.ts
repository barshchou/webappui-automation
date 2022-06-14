import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4331", {
    templateValue: Enums.TEMPLATE_TYPE.freddieMac,
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

export default {
    reportCreationData: _reportCreationData, //reportCreationFixture(),
    commentary: "Test characters, 123. !@#"
};