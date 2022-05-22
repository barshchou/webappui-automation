import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4090", {
    incomeValue: Enums.INCOME_TYPE.RESIDENTIAL,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

export default {
    reportCreationData: _reportCreationData,
    psfRadioValue: 'annually',
    labelText: 'What time period should rent PSF be based on?'
};