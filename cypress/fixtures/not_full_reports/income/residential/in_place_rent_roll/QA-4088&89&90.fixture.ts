import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4088&89&90", {
    incomeValue: Enums.INCOME_TYPE.RESIDENTIAL,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

export default {
    reportCreationData: _reportCreationData,
    psfRadioValuePerAnnually: 'annually',
    psfRadioValuePerMonthly: 'monthly',
    labelText: 'What time period should rent PSF be based on?'
};