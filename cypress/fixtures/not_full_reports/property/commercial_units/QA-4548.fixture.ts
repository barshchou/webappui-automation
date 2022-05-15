import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4548", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});





export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 2,
    squareFeetList: [ 200, 150 ],
    text: "Text for test",
    otherValue: "Other choice"
};