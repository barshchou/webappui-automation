import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4413&14");
};

export default {
    reportCreationData: reportCreationFixture(),
    editedCommentary: "some new commentary to add"
};