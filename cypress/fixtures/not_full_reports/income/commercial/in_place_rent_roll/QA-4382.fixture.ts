import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4382");
};

const leaseStatusesFixture = (): BoweryReports.LeaseStatus[] => {
    return ["Occupied", "Vacant"];
};

export default {
    reportCreationData: reportCreationFixture(),
    leaseStatuses: leaseStatusesFixture()
};