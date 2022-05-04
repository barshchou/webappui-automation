import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4387");
};

const occupiedLeaseFixture: BoweryReports.LeaseStatus = "Occupied";

export default {
    reportCreationData: reportCreationFixture(),
    squareFeet: 81,
    leaseStatus: occupiedLeaseFixture
};