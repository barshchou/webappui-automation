import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";
import { BoweryReports } from "../../../../../types/boweryReports.type";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4413-14", {
        incomeValue: Enums.INCOME_TYPE.both,
    });
};

const leaseStatus: BoweryReports.LeaseStatus = "Occupied";

export default {
    reportCreationData: reportCreationFixture(),
    editedCommentary: "some new commentary to add",
    editedSecondTime: "some new second commentary",
    editedThirdTime: "some new third commentary",
    leaseStatus
};