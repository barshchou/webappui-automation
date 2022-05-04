import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4382");
};

const _leaseStatuses: Array<BoweryReports.LeaseStatus> = ["Occupied", "Vacant"];

export default {
    reportCreationData: reportCreationFixture(),
    leaseStatuses: _leaseStatuses
};