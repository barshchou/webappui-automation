import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4307", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    dateOfValuation: {
        type: "dateOfValuation",
        date: "10-13-2021"
    }
};