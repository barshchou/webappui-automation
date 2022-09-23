import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";
import ReportCreationData = BoweryAutomation.ReportCreationData;

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4409-10", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

export default {
    reportCreationData: reportCreationFixture() as ReportCreationData,
    newCommentary: "some new commentary to add"
};