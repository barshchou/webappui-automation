import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4174_4275", {
    templateValue: Enums.TEMPLATE_TYPE.freddieMac,
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _finalValuesToBe = [ 1900000, 2000000, 800000, 3000000 ];

const _basisSFAnalysisValues = [ 2500, 2600, 1100, 4000 ];
export default {
    reportCreationData: _reportCreationData,
    basisSFAnalysisValues: _basisSFAnalysisValues,
    valueConclusion: 750,
    finalValues: _finalValuesToBe
};