import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4084", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _verifyValues: Array<string> = ["3551.22", "0551.22", "0051.22", "0001.22"];

export default {
    reportCreationData: _reportCreationData,
    verifyValues: _verifyValues,
    incorrectValue: "12",
    validationText: "Census tract should follow XXXX.XX format"
};