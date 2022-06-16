import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData('4543&44&47', {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 2,
    text: "Text for test"
};