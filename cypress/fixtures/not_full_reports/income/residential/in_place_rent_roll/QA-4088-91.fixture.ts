import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4088-91", {
    incomeValue: Enums.INCOME_TYPE.residential,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

export default {
    true: 'true',
    false: 'false',
    reportCreationData: _reportCreationData,
    psfRadioValuePerMonthly: 'monthly' as BoweryReports.UnitsOfMeasure,
    psfRadioValuePerAnnually: 'annually' as BoweryReports.UnitsOfMeasure,
    labelText: 'What time period should rent PSF be based on?'
};