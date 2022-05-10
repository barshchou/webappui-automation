import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4411&12", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    editedCommentary: "some new commentary to add"
};