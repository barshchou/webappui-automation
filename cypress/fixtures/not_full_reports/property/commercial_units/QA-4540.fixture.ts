import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4540", false, {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});


export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 5,
    squareFeetList: [200, 150, 305, 110, 75]

};