import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4409&10");
};

export default {
    reportCreationData: reportCreationFixture(),
    newCommentary: "some new commentary to add"
};