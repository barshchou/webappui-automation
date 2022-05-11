import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4146", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    });
};

export default {
    reportCreationData: reportCreationFixture()
};