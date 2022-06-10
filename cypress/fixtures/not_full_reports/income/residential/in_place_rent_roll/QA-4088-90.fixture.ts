import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryAutomation, BoweryReports } from "../../../../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4088-90", {
    incomeValue: Enums.INCOME_TYPE.RESIDENTIAL,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

export default {
    reportCreationData: _reportCreationData,
    psfRadioValuePerMonthly: 'monthly' as BoweryReports.UnitsOfMeasure,
    psfRadioValuePerAnnually: 'annually' as BoweryReports.UnitsOfMeasure,
    labelText: 'What time period should rent PSF be based on?'
};