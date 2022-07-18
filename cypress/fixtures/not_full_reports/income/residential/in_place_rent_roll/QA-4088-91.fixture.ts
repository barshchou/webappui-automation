import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4088-91", {
    incomeValue: Enums.INCOME_TYPE.residential,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

export default {
    reportCreationData: _reportCreationData,
    psfRadioValuePerMonthly: Enums.UNITS_OF_MEASURE.monthly,
    psfRadioValuePerAnnually: Enums.UNITS_OF_MEASURE.annually,
    labelText: 'What time period should rent PSF be based on?',
    columnName: 'Rent/SF'
};