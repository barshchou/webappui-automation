import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4307"),
    dateOfValuation: {
        type: "dateOfValuation",
        date: "10-13-2021"
    }
};