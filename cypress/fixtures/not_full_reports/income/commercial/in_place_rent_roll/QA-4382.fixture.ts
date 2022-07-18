import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4382", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const leaseStatusesFixture = (): BoweryReports.LeaseStatus[] => {
    return [ "Occupied", "Vacant" ];
};

export default {
    reportCreationData: reportCreationFixture(),
    leaseStatuses: leaseStatusesFixture()
};