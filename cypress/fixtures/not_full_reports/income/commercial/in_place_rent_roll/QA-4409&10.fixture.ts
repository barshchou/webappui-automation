import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4409&10", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    newCommentary: "some new commentary to add"
};