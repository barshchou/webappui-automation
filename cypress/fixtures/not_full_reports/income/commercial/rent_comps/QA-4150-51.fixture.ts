import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4150-51", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

export default {
    reportCreationData: reportCreationFixture()
};