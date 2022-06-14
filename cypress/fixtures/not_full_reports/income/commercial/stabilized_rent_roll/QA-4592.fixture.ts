import enums from "../../../../../enums/enums";
import reportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: reportDataCreator.getReportData("4592", {
        incomeValue: enums.INCOME_TYPE.both
    }),
    commentText: "text Test"
};